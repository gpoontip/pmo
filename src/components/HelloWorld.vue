<template>
  <img alt="Vue logo" src="../assets/logo.png">
  <h1>{{ msg }}</h1>
  <Button label="Submit" @click="openConfirmation" />
  <Dialog header="Confirmation" v-model:visible="displayConfirmation" :style="{width: '350px'}" :modal="true">
    <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
        <span>Are you sure you want to proceed?</span>
    </div>
    <template #footer>
        <Button label="No" icon="pi pi-times" @click="closeConfirmation" class="p-button-text"/>
        <Button label="Yes" icon="pi pi-check" @click="closeConfirmation" class="p-button-text" autofocus />
    </template>
  </Dialog>
</template>

<script>
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  components: {
    Button, Dialog
  },
  data(){
    return {
      displayConfirmation:false
    }
  },
  methods:{
    openConfirmation() {
      this.displayConfirmation = true;
    },
    closeConfirmation() {
      this.displayConfirmation = false;
    },
  }
}
</script>