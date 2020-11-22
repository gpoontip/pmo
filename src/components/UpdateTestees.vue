<template>
  <p><Button @click="display = true">Add Testee</Button></p>
  <p>
    <Dropdown
      v-model="updateAllStatus"
      :options="statuses"
      placeholder="Status"
    />
    <Button @click="updateAllTestees('status')">Update All</Button>
  </p>
  <p>
    <Dropdown
      v-model="updateAllResult"
      :options="results"
      placeholder="Result"
    />
    <Button @click="updateAllTestees('result')">Update All</Button>
  </p>
  <DataTable :value="booking.testees">
    <Column field="id" header="ID"></Column>
    <Column header="Status">
      <template #body="slotProps">
        <UpdateDropdown
          :id="slotProps.data.id"
          :options="statuses"
          :populateWith="slotProps.data.status"
          field="Status"
          @selected="saveTestee"
        />
      </template>
    </Column>
    <Column header="Result">
      <template #body="slotProps">
        <UpdateDropdown
          :id="slotProps.data.id"
          :options="results"
          :populateWith="slotProps.data.result"
          field="Result"
          @selected="saveTestee"
        />
      </template>
    </Column>
    <Column header="Actions">
      <template #body="slotProps">
        <Button
          label="Delete"
          icon="pi pi-times"
          class="p-button-danger p-button-outlined"
          @click="deleteTestee(slotProps.data.id)"
        />
      </template>
    </Column>
  </DataTable>
  <Dialog header="Header" v-model:visible="display">
    <TesteeForm @submitted="addTestee" />
  </Dialog>
</template>

<script>
import { ref } from 'vue';
import Dropdown from 'primevue/dropdown';
import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Dialog from 'primevue/dialog';
import UpdateDropdown from '@/components/UpdateDropdown';
import TesteeForm from './TesteeForm.vue';
export default {
  components: {
    Dropdown,
    Button,
    DataTable,
    Column,
    Dialog,
    UpdateDropdown,
    TesteeForm
  },
  props: {
    booking: {
      type: Object,
      default: new Object()
    }
  },
  emits: ['save', 'add', 'delete'],
  setup(props, { emit }) {
    const display = ref(false);
    const updateAllStatus = ref(null);
    const updateAllResult = ref(null);
    const statuses = ref([
      'Pending',
      'Booking Confirmed',
      'Testing Complete',
      'No Show'
    ]);
    const results = ref(['Pending', 'Negative', 'Positive']);

    function saveTestee(params) {
      const field = params.field.toLowerCase();
      // identify which testee to updates
      // return entire testee array to replace existing array
      const testees = props.booking.testees.map((row) => {
        if (row.id === params.id) {
          row[field] = params.selected;
          return row;
        }
        return row;
      });

      emit('save', testees); // field types = status or result
    }

    function updateAllTestees(type) {
      // update all testees
      // type = status or result
      // return entire testee array to replace existing array
      const testees = props.booking.testees.map((row) => {
        if (type === 'status') row[type] = updateAllStatus.value;
        else if (type === 'result') row[type] = updateAllResult.value;
        return row;
      });

      emit('save', testees);

      // clear input after button click
      if (type === 'status') updateAllStatus.value = null;
      else if (type === 'result') updateAllResult.value = null;
    }

    function addTestee(testee) {
      display.value = false;
      emit('add', testee);
    }

    function deleteTestee(testeeId) {
      const testees = props.booking.testees.filter((testee) => {
        if (testee.id !== testeeId) return true;
      });
      emit('save', testees);
    }

    return {
      display,
      updateAllStatus,
      updateAllResult,
      statuses,
      results,
      saveTestee,
      updateAllTestees,
      addTestee,
      deleteTestee
    };
  }
};
</script>
