import { ref } from 'vue';
import { db } from '@/firebaseConfig.js';

export function useDeleteBooking() {
  const disableConfirmButton = ref(false);
  const bookingID = ref(null);
  const displayConfirmDelete = ref(false);

  function deleteBooking(id) {
    displayConfirmDelete.value = true;
    bookingID.value = id;
  }

  function confirmDeleteBooking() {
    disableConfirmButton.value = true;
    return db.collection('bookings').doc(bookingID.value).delete();
  }

  return {
    disableConfirmButton,
    displayConfirmDelete,
    deleteBooking,
    confirmDeleteBooking
  };
}
