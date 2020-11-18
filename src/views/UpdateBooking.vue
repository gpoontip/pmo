<template>
  <h1>Update Booking</h1>
  <BookingInfo :booking="booking" />
  <AssignLab @submitted="saveLab" :booking="booking" />
  <AssignTesters />
  <UpdateTestees />
  <Toast />
</template>

<script>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import BookingInfo from '@/components/BookingInfo';
import AssignLab from '@/components/AssignLab';
import AssignTesters from '@/components/AssignTesters';
import UpdateTestees from '@/components/UpdateTestees';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast.js';
import { db } from '@/firebaseConfig.js';
export default {
  components: { BookingInfo, AssignLab, AssignTesters, UpdateTestees, Toast },
  setup() {
    const booking = ref({});
    const route = useRoute();
    const toast = useToast();

    if (route.params.id) {
      db.collection('bookings')
        .doc(route.params.id)
        .get()
        .then((doc) => {
          if (doc.exists) {
            booking.value = doc.data();
            // console.log('Document data:', doc.data());
          } else {
            // doc.data() will be undefined in this case
            console.log('No such document!');
          }
        });
    }

    function saveLab(lab) {
      db.collection('bookings')
        .doc(booking.value.id)
        .set({ lab }, { merge: true })
        .then(() => {
          toast.add({
            severity: 'success',
            summary: 'Info Message',
            detail: 'Lab Saved Successully',
            life: 3000
          });
        });
    }

    return { booking, saveLab };
  }
};
</script>
