<template>
  <form @submit.prevent="$emit('submitted', formData)">
    <div class="p-input-filled">
      <Calendar
        v-model="formData.datetime"
        placeholder="Testing Date/Time"
        :showTime="true"
        :showSeconds="true"
        class="testing-datetime"
      />
      <InputText
        placeholder="Name of Project"
        type="text"
        class="production-name"
        v-model="formData.name"
      />
      <InputText
        placeholder="Number of people requiring testing"
        type="number"
        class="number-of-people"
        v-model="formData.amount"
      />
      <div class="radio-group">
        <RadioButton
          id="testing-type-group"
          name="testingType"
          class="testing-type-group"
          v-model="formData.type"
          value="Group Testing"
        />
        <label for="testing-type-group">Group Testing</label>
        <RadioButton
          id="testing-type-individual"
          name="testingType"
          class="testing-type-individual"
          v-model="formData.type"
          value="Individual Testing"
        />
        <label for="testing-type-individual">Individual Testing</label>
      </div>
      <h2>Testing Location</h2>
      <AutoComplete
        v-model="formData.location.name"
        :suggestions="filteredLocations"
        @complete="searchLocations($event)"
        @item-select="selectLocation($event)"
        placeholder="Name/Description"
        field="name"
        class="testing-name"
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
      <h2>Patients</h2>
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
    <Button
      type="submit"
      class="submit"
      :disabled="disabled"
      label="Request Booking"
    />
  </form>
</template>

<script>
import { ref, computed, watchEffect } from 'vue';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import RadioButton from 'primevue/radiobutton';
import Calendar from 'primevue/calendar';
import AutoComplete from 'primevue/autocomplete';
import TesteeForm from './TesteeForm.vue';
export default {
  name: 'BookingForm',
  components: {
    Button,
    InputText,
    RadioButton,
    Calendar,
    AutoComplete,
    TesteeForm
  },
  props: {
    locations: {
      type: Array,
      default: new Array()
    },
    date: {
      type: Date,
      default: new Date()
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const formData = ref({
      datetime: null,
      name: null,
      type: null,
      amount: null,
      location: {
        id: null,
        name: null,
        address: null,
        city: null,
        province: null,
        postalCode: null
      },
      testees: [],
      status: 'Requested',
      lab: null,
      testers: []
    });

    const filteredLocations = ref([]);

    const numberOfTestees = computed(() => {
      if (parseInt(formData.value.amount))
        return parseInt(formData.value.amount);
      else return 0;
    });

    watchEffect(() => {
      // prepopulate based on calendar
      if (props.date) formData.value.datetime = props.date;
    });

    function addTestee(testee, counter) {
      formData.value.testees[counter - 1] = testee;
    }

    function searchLocations(event) {
      if (!event.query.trim().length) {
        filteredLocations.value = [...props.locations];
      } else {
        filteredLocations.value = props.locations.filter((location) => {
          if (!location.name) return false;
          return location.name
            .toLowerCase()
            .startsWith(event.query.toLowerCase());
        });
      }
    }

    function selectLocation(event) {
      formData.value.location.id = event.value.id;
      formData.value.location.address = event.value.address;
      formData.value.location.city = event.value.city;
      formData.value.location.province = event.value.province;
      formData.value.location.postalCode = event.value.postalCode;
    }

    return {
      formData,
      filteredLocations,
      numberOfTestees,
      addTestee,
      searchLocations,
      selectLocation
    };
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
.p-calendar {
  width: 100%;
  margin-bottom: 0.5rem;
}
.p-autocomplete {
  width: 100%;
  margin-bottom: 0.5rem;
  ::v-deep(.p-inputtext) {
    width: 100%;
  }
}
</style>
