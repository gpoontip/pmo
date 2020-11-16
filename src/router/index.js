import { createWebHistory, createRouter } from 'vue-router';
import Home from '@/views/Home.vue';
import Users from '@/views/Users.vue';
import CreateBooking from '@/views/CreateBooking.vue';
import store from '../store';

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
    component: CreateBooking
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
