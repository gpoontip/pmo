<template>
  <h1>Requested Bookings</h1>
  <bookings-table :data="bookings" />
</template>

<script>
import BookingsTable from '@/components/BookingsTable.vue';
import { db } from '@/firebaseConfig.js';
export default {
  name: 'RequestedBookings',
  components: { BookingsTable },
  data() {
    return {
      bookings: []
    };
  },
  created() {
    db.collection('bookings')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const booking = doc.data();
          booking.id = doc.id;
          this.bookings.push(booking);
        });
      });
  }
};
</script>
