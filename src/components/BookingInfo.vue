<template>
  <h2>Booking Info</h2>
  <p v-if="booking.id"><b>Status:</b> {{ booking.status }}</p>
</template>

<script>
export default {
  props: {
    booking: {
      type: Object,
      default: new Object()
    }
  }
};
</script>
