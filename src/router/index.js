import { createWebHistory, createRouter } from 'vue-router';
import Home from '@/views/Home.vue';
import Users from '@/views/Users.vue';
import CreateBooking from '@/views/CreateBooking.vue';
import RequestedBookings from '@/views/RequestedBookings.vue';
import UpdateBooking from '@/views/UpdateBooking.vue';
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
  },
  {
    path: '/requested-bookings',
    name: 'RequestedBookings',
    component: RequestedBookings
  },
  {
    path: '/update-booking/:id',
    name: 'UpdateBooking',
    component: UpdateBooking
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
