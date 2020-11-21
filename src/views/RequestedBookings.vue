<template>
  <h1>Requested Bookings</h1>
  <bookings-table :data="bookings" @delete="deleteBooking" />
  <Dialog
    header="Confirmation"
    v-model:visible="display"
    :style="{ width: '350px' }"
    :modal="true"
  >
    <div class="confirmation-content">
      <i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
      <span>Are you sure you want to delete the booking?</span>
    </div>
    <template #footer>
      <Button
        label="No"
        icon="pi pi-times"
        @click="display = false"
        class="p-button-text"
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        @click="confirm"
        class="p-button-text"
        autofocus
        :disabled="disabled"
      />
    </template>
  </Dialog>
</template>

<script>
import { ref } from 'vue';
import BookingsTable from '@/components/BookingsTable.vue';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import { db } from '@/firebaseConfig.js';
export default {
  name: 'RequestedBookings',
  components: { BookingsTable, Dialog, Button },
  setup() {
    const bookings = ref([]);
    const display = ref(false);
    const bookingID = ref(null);

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

    function deleteBooking(id) {
      display.value = true;
      bookingID.value = id;
    }

    function confirm() {
      db.collection('bookings')
        .doc(bookingID.value)
        .delete()
        .then(() => {
          getBookings();
          display.value = false;
          console.log('Document successfully deleted: ', bookingID.value);
        })
        .catch((error) => {
          console.error('Error removing document: ', error);
        });
    }

    return { bookings, display, deleteBooking, confirm };
  }
};
</script>
