<template>
  <h2>Booking Info</h2>
  <span v-if="booking.id">{{ booking.id }}</span>
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
