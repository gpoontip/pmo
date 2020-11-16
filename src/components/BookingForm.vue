<template>
  <form @submit.prevent="$emit('submitted', formData)">
    <div class="p-input-filled">
      <InputText
        placeholder="Testing Date"
        type="text"
        class="testing-date"
        v-model="formData.date"
      />
      <InputText
        placeholder="Event Time"
        type="text"
        class="event-time"
        v-model="formData.time"
      />
      <InputText
        placeholder="Name of the production"
        type="text"
        class="production-name"
        v-model="formData.name"
      />
      <div class="radio-group">
        <RadioButton
          id="testing-type-group"
          name="testingType"
          class="testing-type-group"
          v-model="formData.type"
          value="group"
          label="Group Testing"
        />
        <label for="testing-type-group">Group Testing</label>
        <RadioButton
          id="testing-type-individual"
          name="testingType"
          class="testing-type-individual"
          v-model="formData.type"
          value="individual"
        />
        <label for="testing-type-individual">Individual Testing</label>
      </div>
      <InputText
        placeholder="Number of people requiring testing"
        type="text"
        class="number-of-people"
        v-model="formData.amount"
      />
      <h2>Testing Location</h2>
      <InputText
        placeholder="Name/Description"
        type="text"
        class="testing-name"
        v-model="formData.location.name"
      />
      <InputText
        placeholder="Street Address"
        type="text"
        class="testing-address"
        v-model="formData.location.address"
      />
      <InputText
        placeholder="City"
        type="text"
        class="testing-city"
        v-model="formData.location.city"
      />
      <InputText
        placeholder="Province"
        type="text"
        class="testing-province"
        v-model="formData.location.province"
      />
      <InputText
        placeholder="Postal Code"
        type="text"
        class="testing-postal-code"
        v-model="formData.location.postalCode"
      />
      <h2>Testees</h2>
      <ol>
        <li
          v-for="testee in numberOfTestees"
          :key="testee"
          :class="'testee' + testee"
        >
          <testee-form :counter="testee" @submitted="addTestee" />
        </li>
      </ol>
    </div>
    <Button type="submit" class="submit">Request Booking</Button>
  </form>
</template>

<script>
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import RadioButton from 'primevue/radiobutton';
import TesteeForm from './TesteeForm.vue';
export default {
  name: 'BookingForm',
  components: {
    Button,
    InputText,
    RadioButton,
    TesteeForm
  },
  data() {
    return {
      formData: {
        date: '',
        time: '',
        name: '',
        type: '',
        amount: 0,
        location: {
          id: null,
          name: '',
          address: '',
          city: '',
          province: '',
          postalCode: ''
        },
        testees: []
      }
    };
  },
  computed: {
    numberOfTestees() {
      if (parseInt(this.formData.amount)) return parseInt(this.formData.amount);
      else return 0;
    }
  },
  methods: {
    addTestee(formData, counter) {
      this.formData.testees[counter - 1] = formData;
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
.p-radiobutton {
  margin-right: 0.25rem;
  & + label {
    margin-right: 0.5rem;
  }
}
.radio-group {
  margin-bottom: 0.5rem;
}
</style>
