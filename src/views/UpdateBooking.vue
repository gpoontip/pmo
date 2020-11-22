<template>
  <h1>Update Booking</h1>
  <h2>Booking Info</h2>
  <BookingInfo :booking="booking" />
  <AssignLab @submitted="saveLab" :booking="booking" />
  <h2>Assign Testers</h2>
  <AssignTesters @submitted="saveTesters" :booking="booking" :users="users" />
  <h2>Testees</h2>
  <UpdateTestees @save="saveTestees" @add="addTestee" :booking="booking" />
  <p v-if="booking.id">
    <Button @click="$router.push({ name: 'RequestedBookings' })">Done</Button>
    <Button
      v-if="booking.status === 'Testing Complete'"
      @click="display = true"
      class="p-ml-3 p-button-success"
      >Confirm</Button
    >
  </p>
  <Dialog
    header="Confirmation"
    v-model:visible="display"
    :style="{ width: '350px' }"
    :modal="true"
  >
    <div class="confirmation-content">
      <i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
      <span>Are you sure you want to complete the booking?</span>
    </div>
    <template #footer>
      <Button
        label="No"
        icon="pi pi-times"
        @click="display = false"
        class="p-button-text"
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        @click="confirm"
        class="p-button-text"
        autofocus
        :disabled="disabled"
      />
    </template>
  </Dialog>
  <Toast />
</template>

<script>
import { ref, onBeforeMount, onUnmounted, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import BookingInfo from '@/components/BookingInfo';
import AssignLab from '@/components/AssignLab';
import AssignTesters from '@/components/AssignTesters';
import UpdateTestees from '@/components/UpdateTestees';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast.js';
import { db } from '@/firebaseConfig.js';

export default {
  components: {
    BookingInfo,
    AssignLab,
    AssignTesters,
    UpdateTestees,
    Button,
    Dialog,
    Toast
  },
  setup() {
    const display = ref(false);
    const disabled = ref(false);
    const booking = ref({});
    const users = ref([]);
    const route = useRoute();
    const router = useRouter();
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
      // check to see if change status to "Testing Complete"
      // if status is "Testing Complete" or "No Show" for all testees
      // if result is not "Pending"
      // called on create, update, delete Testeee
      let pending = 0;
      let progress = 0;
      let complete = 0;

      testees.forEach((row) => {
        const { status, result } = row;
        if (
          status === 'Pending' ||
          (result === 'Pending' && status !== 'No Show')
        )
          pending++;
        if (
          status === 'Testing Complete' ||
          (status === 'No Show' && result === 'Pending')
        )
          complete++;
        if (
          status === 'Booking Confirmed' ||
          (status === 'No Show' && result !== 'Pending')
        )
          progress++;
        if (result !== 'Pending') complete++;
      });

      let status = 'Requested';
      if (progress || (complete && pending)) status = 'In Progress';
      else if (!pending && !progress && complete) status = 'Testing Complete';

      updateBooking({ testees, status }, 'Testee(s) Updated');
    }

    async function updateBooking(params, msg) {
      await db
        .collection('bookings')
        .doc(booking.value.id)
        .set(params, { merge: true })
        .then(() => {
          if (msg) {
            toast.add({
              severity: 'success',
              summary: 'Success Message',
              detail: msg,
              life: 3000
            });
          }
        });
    }

    function addTestee(testee) {
      db.collection('testees')
        .add(testee)
        .then((docRef) => {
          console.log('Testee Document written with ID: ', docRef.id);
          testee.id = docRef.id;
          booking.value.testees.push(testee);
          saveTestees(booking.value.testees);
          updateBooking({ amount: booking.value.testees.length }, false);
        })
        .catch((error) => {
          console.error('Error adding document: ', error);
        });
    }

    async function confirm() {
      disabled.value = true;
      await updateBooking({ status: 'Closed' }, 'Booking Updated');
      router.push({ name: 'RequestedBookings' });
    }

    return {
      display,
      disabled,
      booking,
      users,
      saveLab,
      saveTesters,
      saveTestees,
      addTestee,
      confirm
    };
  }
};
</script>
