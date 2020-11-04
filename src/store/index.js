import { createStore } from 'vuex';
import axios from 'axios';

const store = createStore({
  state() {
    return {
      idToken: null,
      userId: null,
      user: null,
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
    },
  },
  actions: {
    signup({ commit, dispatch }, authData) {
      axios
        .post(
          `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.VUE_APP_APIKEY}`,
          {
            email: authData.email,
            password: authData.password,
            returnSecureToken: true,
          }
        )
        .then((res) => {
          console.log(res);
          commit('authUser', {
            token: res.data.idToken,
            userId: res.data.localId,
          });
          localStorage.setItem('token', res.data.idToken);
          localStorage.setItem('userId', res.data.localId);
          localStorage.setItem('email', res.data.email);
          dispatch('storeUser', {
            email: authData.email,
          });

          setTimeout(function () {
            // router.push('/dashboard');
            console.log('registered');
          }, 3000);
        })
        .catch((error) => console.log(error));
    },
    login({ commit }, authData) {
      axios
        .post(
          `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.VUE_APP_APIKEY}`,
          {
            email: authData.email,
            password: authData.password,
            returnSecureToken: true,
          }
        )
        .then((res) => {
          console.log(res);
          localStorage.setItem('token', res.data.idToken);
          localStorage.setItem('userId', res.data.localId);
          localStorage.setItem('email', res.data.email);
          commit('authUser', {
            token: res.data.idToken,
            userId: res.data.localId,
          });
          //   router.push('/dashboard');
          console.log('authenticated');
        })
        .catch((error) => console.log(error.message));
    },
    storeUser({ state }, userData) {
      if (!state.idToken) {
        return;
      }
      axios
        .post(
          `https://pmogs-1704c.firebaseio.com/users.json?auth=${state.idToken}`,
          userData
        )
        .then((res) => console.log(res))
        .catch((error) => console.log(error));
    },
  },
});

export default store;
