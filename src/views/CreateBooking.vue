<template>
  <booking-form @submitted="createBooking" :locations="locations" />
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import BookingForm from '@/components/BookingForm';
import { db } from '@/firebaseConfig.js';

export default {
  name: 'UserView',
  components: {
    BookingForm
  },
  setup() {
    const router = useRouter();
    const locations = ref([]);

    db.collection('locations')
      .orderBy('name')
      .get()
      .then((querySnapshot) => {
        locations.value = [];
        querySnapshot.forEach((doc) => {
          const user = doc.data();
          user.id = doc.id;
          locations.value.push(user);
        });
      });

    async function createBooking(formData) {
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
          router.push({ name: 'RequestedBookings' });
        })
        .catch((error) => {
          console.error('Error adding document: ', error);
        });
    }

    return { locations, createBooking };
  }
};
</script>
