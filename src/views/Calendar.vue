<template>
  <h1>Calendar</h1>
  <Calendar :bookings="bookings" @click="showBooking" @fetch="getBookings" />
  <Dialog header="Booking Info" v-model:visible="display">
    <BookingInfo :booking="event.extendedProps" />
    <Button
      icon="pi pi-pencil"
      label="Update"
      @click="$router.push({ name: 'UpdateBooking', params: { id: event.id } })"
    />
  </Dialog>
</template>

<script>
import { ref, onUnmounted } from 'vue';
import { db } from '@/firebaseConfig.js';
import { formatDate } from '@/helpers/date';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import BookingInfo from '@/components/BookingInfo';
import Calendar from '@/components/Calendar.vue';

export default {
  components: { Calendar, Dialog, Button, BookingInfo },
  setup() {
    let unsubscribe;
    const bookings = ref([]);
    const display = ref(false);
    const event = ref({});

    onUnmounted(() => {
      unsubscribe(); // Stop listening to changes
    });

    function getBookings({ start, end }) {
      if (typeof unsubscribe === 'function') unsubscribe();

      // listen for real time updates to booking document
      unsubscribe = db
        .collection('bookings')
        .where('datetime', '>', start)
        .where('datetime', '<', end)
        .onSnapshot((querySnapshot) => {
          bookings.value = [];
          querySnapshot.forEach((doc) => {
            const booking = doc.data();
            booking.id = doc.id;
            if (booking.datetime) {
              const row = {
                id: doc.id,
                title: booking.name,
                start: formatDate({
                  date: booking.datetime.toDate(),
                  time: true
                }),
                extendedProps: booking
              };
              bookings.value.push(row);
            }
          });
        });
    }

    function showBooking(e) {
      event.value = e.event;
      display.value = true;
    }

    return { bookings, showBooking, display, event, getBookings };
  }
};
</script>

<style lang="scss" scoped>
.p-dialog-mask {
  margin-bottom: 0;
  ::v-deep(.p-dialog-header) {
    padding-bottom: 1rem;
  }
}
</style>
