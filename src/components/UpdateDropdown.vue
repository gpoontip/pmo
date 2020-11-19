<template>
  <Dropdown
    v-model="selected"
    :options="options"
    :placeholder="field"
    @change="$emit('selected', { id, selected, field })"
  />
</template>
<script>
import { ref, watchEffect } from 'vue';
import Dropdown from 'primevue/dropdown';
export default {
  components: { Dropdown },
  props: {
    id: {
      type: String,
      required: true
    },
    populateWith: {
      type: String,
      default: null
    },
    options: {
      type: Array,
      default: new Array()
    },
    field: {
      type: String,
      default: 'Status'
    }
  },
  emits: ['selected'],
  setup(props) {
    const selected = ref(null);

    watchEffect(() => {
      if (props.populateWith) selected.value = props.populateWith;
    });

    return { selected };
  }
};
</script>
