<template>
  <h1>Update Booking</h1>
  <BookingInfo :booking="booking" />
  <AssignLab @submitted="saveLab" :booking="booking" />
  <AssignTesters @submitted="saveTesters" :booking="booking" :users="users" />
  <UpdateTestees
    @status="saveTestees"
    @result="saveTestees"
    :booking="booking"
  />
  <Toast />
</template>

<script>
import { ref, onBeforeMount, onUnmounted, watchEffect } from 'vue';
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
    const users = ref([]);
    const route = useRoute();
    const toast = useToast();
    let unsubscribe;

    onBeforeMount(() => {
      if (route.params.id) {
        // listen for real time updates to booking document
        unsubscribe = db
          .collection('bookings')
          .doc(route.params.id)
          .onSnapshot({ includeMetadataChanges: true }, (doc) => {
            if (doc.exists) {
              booking.value = doc.data();
              booking.value.id = doc.id;
            } else {
              console.log('No such document!');
            }
          });
      }
    });

    onUnmounted(() => {
      unsubscribe(); // Stop listening to changes
    });

    watchEffect(() => {
      if (booking.value.testers) {
        const emails = booking.value.testers.map((tester) => {
          return tester.email;
        });
        if (emails.length) {
          db.collection('users')
            .where('email', 'not-in', emails)
            .get()
            .then((querySnapshot) => {
              setUsers(querySnapshot);
            });
        } else {
          db.collection('users')
            .get()
            .then((querySnapshot) => {
              setUsers(querySnapshot);
            });
        }
      }
    });

    function setUsers(querySnapshot) {
      users.value = [];
      querySnapshot.forEach((doc) => {
        const user = doc.data();
        user.id = doc.id;
        users.value.push(user);
      });
    }

    function saveLab(lab) {
      updateBooking({ lab }, 'Lab Saved Successully');
    }

    function saveTesters(testers) {
      updateBooking({ testers }, 'Testers Updated');
    }

    function saveTestees(testees) {
      updateBooking({ testees }, 'Testee(s) Updated');
    }

    function updateBooking(params, msg) {
      db.collection('bookings')
        .doc(booking.value.id)
        .set(params, { merge: true })
        .then(() => {
          toast.add({
            severity: 'success',
            summary: 'Success Message',
            detail: msg,
            life: 3000
          });
        });
    }

    return { booking, users, saveLab, saveTesters, saveTestees };
  }
};
</script>
