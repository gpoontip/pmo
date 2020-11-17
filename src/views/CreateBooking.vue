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
      // create location (if it doesn't exist)
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

      for await (const [key, row] of formData.testees.entries()) {
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
      // TODO: add status
      // TODO: combine date/time
      const ref = db.collection('bookings').doc();
      const id = ref.id;
      formData.id = id;
      await db
        .collection('bookings')
        .doc(id)
        .set(formData)
        .then(() => {
          console.log('Booking Document written with ID: ', id);
        })
        .catch((error) => {
          console.error('Error adding document: ', error);
        });
    }
  }
};
</script>
