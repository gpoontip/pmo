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
          // doc.data() is never undefined for query doc snapshots
          //   console.log(doc.id, ' => ', doc.data());
          this.bookings.push(doc.data());
        });
      });
  }
};
</script>
