<template>
  <Dialog
    header="Confirmation"
    v-model:visible="visible"
    :style="{ width: '350px' }"
    :modal="true"
  >
    <div class="confirmation-content">
      <i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
      <span>Are you sure you want to delete the booking?</span>
    </div>
    <template #footer>
      <Button
        label="No"
        icon="pi pi-times"
        @click="visible = false"
        class="p-button-text"
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        @click="$emit('confirm')"
        class="p-button-text"
        autofocus
        :disabled="disable"
      />
    </template>
  </Dialog>
  <Toast />
</template>

<script>
import { ref, watch, watchEffect } from 'vue';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import Toast from 'primevue/toast';

export default {
  components: { Dialog, Button, Toast },
  props: {
    disable: {
      type: Boolean,
      default: false
    },
    display: {
      type: Boolean,
      default: false
    }
  },
  emits: ['confirm', 'display'],
  setup(props, { emit }) {
    const visible = ref(props.display);
    watch(visible, (visible) => {
      emit('display', visible);
    });
    watchEffect(() => {
      visible.value = props.display;
    });
    return { visible };
  }
};
</script>
