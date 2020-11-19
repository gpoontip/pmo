<template>
  <form v-if="editMode" @submit.prevent="submit">
    <InputText
      placeholder="First Name"
      type="text"
      class="testee-first-name"
      v-model="formData.firstName"
    />
    <InputText
      placeholder="Last Name"
      type="text"
      class="testee-last-name"
      v-model="formData.lastName"
    />
    <InputText
      placeholder="DOB"
      type="text"
      class="testee-dob"
      v-model="formData.dob"
    />
    <InputText
      placeholder="Email Address"
      type="text"
      class="testee-email"
      v-model="formData.email"
    />
    <Textarea
      placeholder="Physical Address"
      class="testee-address"
      v-model="formData.address"
    />
    <Textarea
      placeholder="Comments"
      class="testee-comments"
      v-model="formData.comments"
    />
    <Button type="submit" class="save-testee p-button-sm p-button-outlined"
      >Save Testee</Button
    >
  </form>
  <div class="testee-info" v-else>
    <p>
      <strong>First Name:</strong> {{ formData.firstName }}<br />
      <strong>Last Name:</strong> {{ formData.lastName }}<br />
      <strong>DOB:</strong> {{ formData.dob }}<br />
      <strong>Email Address:</strong> {{ formData.email }}<br />
      <strong>Address:</strong> {{ formData.address }}<br />
      <strong>Comments:</strong> {{ formData.comments }}
    </p>
    <Button @click="toggle" class="edit-testee p-button-sm p-button-outlined"
      >Edit Testee</Button
    >
  </div>
</template>

<script>
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Textarea from 'primevue/textarea';
export default {
  name: 'TesteeForm',
  props: ['counter'],
  components: {
    InputText,
    Textarea,
    Button
  },
  data() {
    return {
      editMode: true,
      formData: {
        id: null,
        firstName: null,
        lastName: null,
        dob: null,
        mobile: null,
        email: null,
        address: null,
        comments: null,
        status: null,
        result: null
      }
    };
  },
  methods: {
    submit() {
      this.toggle();
      this.$emit('submitted', this.formData, this.counter);
    },
    toggle() {
      this.editMode = !this.editMode;
    }
  }
};
</script>

<style lang="scss" scoped>
.p-inputtext {
  width: 100%;
  display: block;
  margin-bottom: 0.5rem;
}
.p-button {
  margin-bottom: 0.5rem;
}
</style>
