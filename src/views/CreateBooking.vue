<template>
  <booking-form @submitted="createBooking" />
</template>

<script>
import BookingForm from '@/components/BookingForm';
import { db } from '@/firebaseConfig.js';

export default {
  name: 'UserView',
  components: {
    BookingForm
  },
  methods: {
    async createBooking(formData) {
      // create location
      // TODO: define if it exists by passing ID via autocomplete
      if (!formData.location.id) {
        await db
          .collection('locations')
          .add(formData.location)
          .then((docRef) => {
            console.log('Location Document written with ID: ', docRef.id);
            formData.location.id = docRef.id;
          })
          .catch((error) => {
            console.error('Error adding document: ', error);
          });
      }

      // loop through all entered testees
      for await (const [key, row] of formData.testees.entries()) {
        // TODO: define if it exists by passing ID via autocomplete
        if (!formData.testees[key].id) {
          await db
            .collection('testees')
            .add(row)
            .then((docRef) => {
              console.log('Testee Document written with ID: ', docRef.id);
              formData.testees[key].id = docRef.id;
            })
            .catch((error) => {
              console.error('Error adding document: ', error);
            });
        }
      }

      // create booking row
      // TODO: combine date/time
      await db
        .collection('bookings')
        .add(formData)
        .then((docRef) => {
          console.log('Booking Document written with ID: ', docRef.id);
        })
        .catch((error) => {
          console.error('Error adding document: ', error);
        });
    }
  }
};
</script>
