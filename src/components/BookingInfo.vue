<template>
  <div v-if="booking.id">
    <ul>
      <li>
        <h3 class="p-mt-0">{{ booking.name }}</h3>
      </li>
      <li v-if="datetime">{{ datetime }}</li>
      <li><b>Number of Patients:</b> {{ booking.amount }}</li>
      <li><b>Status:</b> {{ booking.status }}</li>
      <li><b>Type:</b> {{ booking.type }}</li>
      <li v-if="location">
        <h3>Location</h3>
        <ul>
          <li v-if="location.name">{{ location.name }}</li>
          <li v-if="location.address">{{ location.address }}</li>
          <li v-if="location.city || location.province || location.postalCode">
            {{ location.city }}, {{ location.province }}
            {{ location.postalCode }}
          </li>
        </ul>
      </li>
      <li v-if="booking.lab"><b>Lab:</b> {{ booking.lab }}</li>
    </ul>
  </div>
</template>

<script>
import { computed } from 'vue';
import { formatDate } from '@/helpers/date';

export default {
  props: {
    booking: {
      type: Object,
      default: new Object()
    }
  },
  setup(props) {
    const location = computed(() => {
      return props.booking.location;
    });
    const datetime = computed(() => {
      if (props.booking.datetime)
        return formatDate({
          date: props.booking.datetime.toDate(),
          string: true
        });
      return false;
    });

    return { location, datetime };
  }
};
</script>

<style lang="scss" scoped>
ul {
  margin: 0 0 1rem;
  padding-left: 0;
  list-style: none;
  li {
    margin-bottom: 0.5rem;
  }
}
h3 {
  margin-bottom: 0.5rem;
}
</style>
