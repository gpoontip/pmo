<template>
  <h1>Calendar</h1>
  <Calendar
    :bookings="bookings"
    @click="showBooking"
    @fetch="getBookings"
    @create="showForm"
  />
  <Dialog header="Booking Info" v-model:visible="displayBooking">
    <BookingInfo :booking="event.extendedProps" />
    <Button
      icon="pi pi-pencil"
      label="Update"
      @click="$router.push({ name: 'UpdateBooking', params: { id: event.id } })"
    />
    <Button
      class="p-button-danger p-ml-3"
      icon="pi pi-times"
      label="Delete"
      @click="deleteBooking(event.id)"
    />
  </Dialog>
  <Dialog header="Booking Info" v-model:visible="displayForm">
    <BookingForm
      @submitted="onCreateBooking"
      :locations="locations"
      :date="selectedDate"
      :disabled="disabled"
    />
  </Dialog>
  <ConfirmDelete
    :display="displayConfirmDelete"
    :disable="disableConfirmButton"
    @confirm="confirm"
    @display="display"
  />
</template>

<script>
import { ref, onUnmounted } from 'vue';
import { db } from '@/firebaseConfig.js';
import { formatDate } from '@/helpers/date';
import { useToast } from 'primevue/usetoast.js';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import BookingInfo from '@/components/BookingInfo';
import Calendar from '@/components/Calendar.vue';
import BookingForm from '@/components/BookingForm';
import ConfirmDelete from '@/components/ConfirmDelete.vue';
import { useCreateBooking } from '@/services/useCreateBooking';
import { useDeleteBooking } from '@/services/useDeleteBooking';

export default {
  components: {
    Calendar,
    Dialog,
    Button,
    BookingInfo,
    BookingForm,
    ConfirmDelete
  },
  setup() {
    let unsubscribe;
    const toast = useToast();
    const bookings = ref([]);
    const displayBooking = ref(false);
    const displayForm = ref(false);
    const event = ref({});
    const selectedDate = ref(new Date());
    const disabled = ref(false);
    const { locations, getLocations, createBooking } = useCreateBooking({
      redirect: false
    });
    const {
      disableConfirmButton,
      displayConfirmDelete,
      deleteBooking,
      confirmDeleteBooking
    } = useDeleteBooking();

    getLocations();

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
      displayBooking.value = true;
      displayForm.value = false;
    }

    function showForm(date) {
      selectedDate.value = date;
      displayForm.value = true;
      displayBooking.value = false;
    }

    async function onCreateBooking(formData) {
      disabled.value = true;
      await createBooking(formData);
      displayForm.value = false;
      disabled.value = false;
    }

    function confirm() {
      confirmDeleteBooking()
        .then(() => {
          displayConfirmDelete.value = false;
          disableConfirmButton.value = false;
          displayBooking.value = false;
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
      showBooking,
      displayBooking,
      displayForm,
      event,
      getBookings,
      showForm,
      locations,
      onCreateBooking,
      selectedDate,
      displayConfirmDelete,
      deleteBooking,
      confirm,
      display,
      disableConfirmButton,
      disabled
    };
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
