<template>
  <BookingForm @submitted="createBooking" :locations="locations" />
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
