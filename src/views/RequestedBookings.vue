<template>
  <h1>Requested Bookings</h1>
  <BookingsTable :data="bookings" @delete="deleteBooking" />
  <ConfirmDelete
    :display="displayConfirmDelete"
    :disable="disableConfirmButton"
    @confirm="confirm"
    @display="display"
  />
</template>

<script>
import { ref } from 'vue';
import BookingsTable from '@/components/BookingsTable.vue';
import ConfirmDelete from '@/components/ConfirmDelete.vue';
import { useToast } from 'primevue/usetoast.js';
import { db } from '@/firebaseConfig.js';
import { useDeleteBooking } from '@/services/useDeleteBooking';

export default {
  name: 'RequestedBookings',
  components: { BookingsTable, ConfirmDelete },
  setup() {
    const bookings = ref([]);
    const toast = useToast();
    const {
      disableConfirmButton,
      displayConfirmDelete,
      deleteBooking,
      confirmDeleteBooking
    } = useDeleteBooking();

    getBookings();

    function getBookings() {
      db.collection('bookings')
        .get()
        .then((querySnapshot) => {
          bookings.value = [];
          querySnapshot.forEach((doc) => {
            const booking = doc.data();
            booking.id = doc.id;
            bookings.value.push(booking);
          });
        });
    }

    function confirm() {
      confirmDeleteBooking()
        .then(() => {
          getBookings();
          displayConfirmDelete.value = false;
          disableConfirmButton.value = false;
          toast.add({
            severity: 'success',
            summary: 'Success Message',
            detail: 'Document successfully deleted',
            life: 3000
          });
        })
        .catch((error) => {
          console.error('Error removing document: ', error);
        });
    }

    function display(value) {
      displayConfirmDelete.value = value;
    }

    return {
      bookings,
      displayConfirmDelete,
      deleteBooking,
      confirm,
      display,
      disableConfirmButton
    };
  }
};
</script>
