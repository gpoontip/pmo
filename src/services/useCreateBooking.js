import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { db } from '@/firebaseConfig.js';

export function useCreateBooking({ redirect }) {
  const router = useRouter();
  const locations = ref([]);

  function getLocations() {
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
  }

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
    } else if (formData.location.name) {
      formData.location.name = formData.location.name.name;
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
    return await db
      .collection('bookings')
      .add(formData)
      .then((docRef) => {
        console.log('Booking Document written with ID: ', docRef.id);
        if (redirect)
          router.push({ name: redirect, params: { id: docRef.id } });
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
      });
  }

  return { locations, getLocations, createBooking };
}
