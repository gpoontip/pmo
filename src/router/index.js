import { createWebHistory, createRouter } from 'vue-router';
import store from '../store';

let entryUrl = null;
const guard = async (to, from, next) => {
  if (store.state.idToken) {
    if (entryUrl) {
      const url = entryUrl;
      entryUrl = null;
      return next(url); // goto stored url
    } else {
      return next(); // all is fine
    }
  } else {
    entryUrl = to.path; // store entry url before redirect
    store.commit('storeEntryUrl', entryUrl);
    next('/login');
  }
};

function loadView(view) {
  return () =>
    import(/* webpackChunkName: "view-[request]" */ `@/views/${view}.vue`);
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: loadView('Calendar'),
    beforeEnter: guard
  },
  {
    path: '/create-booking',
    name: 'CreateBooking',
    component: loadView('CreateBooking'),
    beforeEnter: guard
  },
  {
    path: '/requested-bookings',
    name: 'RequestedBookings',
    component: loadView('RequestedBookings'),
    beforeEnter: guard
  },
  {
    path: '/update-booking/:id',
    name: 'UpdateBooking',
    component: loadView('UpdateBooking'),
    beforeEnter: guard
  },
  {
    path: '/calendar',
    name: 'Calendar',
    component: loadView('Calendar'),
    beforeEnter: guard
  },
  {
    path: '/users',
    name: 'Users',
    component: loadView('Users'),
    beforeEnter: guard
  },
  {
    path: '/locations',
    name: 'Locations',
    component: loadView('Locations'),
    beforeEnter: guard
  },
  {
    path: '/patients',
    name: 'Patients',
    component: loadView('Patients'),
    beforeEnter: guard
  },
  {
    path: '/my-account',
    name: 'Account',
    component: loadView('Account'),
    beforeEnter: guard
  },
  {
    path: '/login',
    name: 'Login',
    component: loadView('Login')
  }
];

export default createRouter({
  history: createWebHistory(),
  routes
});
