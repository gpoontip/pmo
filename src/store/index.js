import { createStore } from 'vuex';
import axios from 'axios';
import router from '../router';
import { db } from '@/firebaseConfig.js';

const store = createStore({
  state() {
    return {
      idToken: null,
      userId: null,
      user: null,
      entryUrl: '/'
    };
  },
  mutations: {
    authUser(state, userData) {
      state.idToken = userData.token;
      state.userId = userData.userId;
    },
    storeUser(state, user) {
      state.user = user;
    },
    clearAuthData(state) {
      state.idToken = null;
      state.userId = null;
      state.user = null;
      state.entryUrl = '/';
    },
    storeEntryUrl(state, url) {
      state.entryUrl = url;
    }
  },
  actions: {
    signup({ commit, dispatch }, authData) {
      return axios
        .post(
          `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.VUE_APP_APIKEY}`,
          {
            email: authData.email,
            password: authData.password,
            returnSecureToken: true
          }
        )
        .then((res) => {
          // console.log(res);
          commit('authUser', {
            token: res.data.idToken,
            userId: res.data.localId
          });
          localStorage.setItem('token', res.data.idToken);
          localStorage.setItem('userId', res.data.localId);
          localStorage.setItem('email', res.data.email);

          // TODO add role
          const user = { email: authData.email };
          dispatch('storeUser', { user, id: res.data.localId });

          setTimeout(function () {
            // router.push('/dashboard');
            console.log('registered');
          }, 3000);
        })
        .catch((error) => Promise.reject(error));
    },
    login({ commit }, authData) {
      return axios
        .post(
          `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.VUE_APP_APIKEY}`,
          {
            email: authData.email,
            password: authData.password,
            returnSecureToken: true
          }
        )
        .then((res) => {
          // console.log(res);
          localStorage.setItem('token', res.data.idToken);
          localStorage.setItem('userId', res.data.localId);
          localStorage.setItem('email', res.data.email);
          commit('authUser', {
            token: res.data.idToken,
            userId: res.data.localId
          });
          //   router.push('/dashboard');
          console.log('authenticated');
        })
        .catch((error) => Promise.reject(error));
    },
    storeUser({ state }, { user, id }) {
      if (!state.idToken) {
        return;
      }

      db.collection('users')
        .doc(id)
        .set(user)
        .then(() => {
          console.log('User Document written with ID: ', id);
        })
        .catch((error) => {
          console.error('Error adding document: ', error);
        });
    },
    logout({ commit }) {
      commit('clearAuthData');
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      router.replace('/login');
    },
    autoLogin({ commit }) {
      const token = localStorage.getItem('token');
      if (!token) {
        return;
      }
      const userId = localStorage.getItem('userId');
      commit('authUser', {
        token,
        userId
      });
    },
    fetchUser({ commit, state }) {
      if (!state.idToken) {
        return;
      }
      const email = localStorage.getItem('email');

      db.collection('users')
        .where('email', '==', email)
        .get()
        .then((querySnapshot) => {
          const users = [];
          querySnapshot.forEach(function (doc) {
            const user = doc.data();
            user.id = doc.id;
            users.push(user);
          });
          commit('storeUser', users[0]);
        })
        .catch((error) => console.log(error));
    }
  },
  getters: {
    isAuthenticated(state) {
      return state.idToken !== null;
    },
    user(state) {
      return state.user;
    }
  }
});

export default store;
