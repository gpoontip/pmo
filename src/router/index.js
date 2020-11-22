import { createWebHistory, createRouter } from 'vue-router';
import Home from '@/views/Home.vue';
import Users from '@/views/Users.vue';
import store from '../store';

function loadView(view) {
  return () =>
    import(/* webpackChunkName: "view-[request]" */ `@/views/${view}.vue`);
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/users',
    name: 'Users',
    component: Users,
    beforeEnter(to, from, next) {
      if (store.state.idToken) {
        next();
      } else {
        next('/');
      }
    }
  },
  {
    path: '/create-booking',
    name: 'CreateBooking',
    component: loadView('CreateBooking')
  },
  {
    path: '/requested-bookings',
    name: 'RequestedBookings',
    component: loadView('RequestedBookings')
  },
  {
    path: '/update-booking/:id',
    name: 'UpdateBooking',
    component: loadView('UpdateBooking')
  },
  {
    path: '/calendar',
    name: 'Calendar',
    component: loadView('Calendar')
  }
];

export default createRouter({
  history: createWebHistory(),
  routes
});
