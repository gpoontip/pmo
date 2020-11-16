<template>
  <booking-form @submitted="createBooking" />
</template>

<script>
import BookingForm from '@/components/BookingForm';
export default {
  name: 'UserView',
  components: {
    BookingForm
  },
  methods: {
    createBooking(formData) {
      console.log(formData);
      // create booking row
      // create location (if it doesn't exist)
      // create testees (if they don't exist)
    }
  }
};
</script>
