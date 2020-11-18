<template>
  <p>Lab where samples are being sent:</p>
  <form @submit.prevent="$emit('submitted', lab)">
    <InputText v-model="lab" placeholder="Name" />
    <Button type="submit">Save</Button>
  </form>
</template>

<script>
import { ref, watchEffect } from 'vue';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
export default {
  components: { InputText, Button },
  props: {
    booking: {
      type: Object,
      default: new Object()
    }
  },
  emits: ['submitted', 'update:booking'],
  setup(props) {
    const lab = ref('');

    watchEffect(() => {
      if (props.booking.lab) lab.value = props.booking.lab;
    });

    return { lab };
  }
};
</script>
