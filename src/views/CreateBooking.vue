<template>
  <h1>Create Booking</h1>
  <div class="p-grid">
    <div class="p-col-12 p-md-6">
      <BookingForm @submitted="createBooking" :locations="locations" />
    </div>
  </div>
</template>

<script>
import BookingForm from '@/components/BookingForm';
import { useCreateBooking } from '@/services/useCreateBooking';

export default {
  name: 'UserView',
  components: {
    BookingForm
  },
  setup() {
    const { locations, getLocations, createBooking } = useCreateBooking({
      redirect: 'UpdateBooking'
    });

    getLocations();

    return { locations, createBooking };
  }
};
</script>

<style lang="scss">
.form {
}
</style>
