<template>
  <DataTable
    :value="dataFormatted"
    :paginator="true"
    :rows="5"
    :loading="loading"
    :filters="filters"
    removableSort
    class="p-datatable-responsive p-input-filled"
    ref="dt"
  >
    <template #header>
      <div class="table-header">
        <span class="p-input-icon-left">
          <i class="pi pi-search" />
          <InputText v-model="filters['global']" placeholder="Global Search" />
        </span>
        <Button
          icon="pi pi-external-link"
          label="Export"
          @click="exportCSV($event)"
        />
      </div>
    </template>
    <template #empty> No customers found. </template>
    <template #loading> Loading... Please wait. </template>
    <Column
      :sortable="true"
      field="name"
      header="Name of Production"
      filterMatchMode="contains"
    >
      <template #body="slotProps">
        <span class="p-column-title">Name of Production</span>
        <span>{{ slotProps.data.name }}</span>
      </template>
      <template #filter>
        <InputText
          type="text"
          v-model="filters['name']"
          class="p-column-filter"
          placeholder="Name"
        />
      </template>
    </Column>
    <Column
      :sortable="true"
      field="datetime"
      header="Date"
      filterMatchMode="custom"
      :filterFunction="filterDate"
    >
      <template #body="slotProps">
        <span class="p-column-title">Date/Time</span>
        {{ slotProps.data.datetime }}
      </template>
      <template #filter>
        <Calendar
          v-model="filters['datetime']"
          dateFormat="yy-mm-dd"
          class="p-column-filter"
          placeholder="Date"
        />
      </template>
    </Column>
    <Column
      :sortable="true"
      field="amount"
      header="Number of Testees"
      filterMatchMode="contains"
    >
      <template #body="slotProps">
        <span class="p-column-title">Number of Testees</span>
        <span>{{ parseInt(slotProps.data.amount) }}</span>
      </template>
      <template #filter>
        <InputText
          type="text"
          v-model="filters['amount']"
          class="p-column-filter"
          placeholder="Testees"
        />
      </template>
    </Column>
    <Column
      :sortable="true"
      field="location.name"
      header="Location"
      filterMatchMode="contains"
    >
      <template #body="slotProps">
        <span class="p-column-title">Location</span>
        <span>{{ slotProps.data.location.name }}</span>
      </template>
      <template #filter>
        <InputText
          type="text"
          v-model="filters['location.name']"
          class="p-column-filter"
          placeholder="Location"
        />
      </template>
    </Column>
    <Column
      :sortable="true"
      field="status"
      header="Status"
      filterMatchMode="contains"
    >
      <template #body="slotProps">
        <span class="p-column-title">Status</span>
        <span>{{ slotProps.data.status }}</span>
      </template>
      <template #filter>
        <InputText
          type="text"
          v-model="filters['status']"
          class="p-column-filter"
          placeholder="Status"
        />
      </template>
    </Column>
    <Column :exportable="false">
      <template #body="slotProps">
        <Button
          label="Update"
          icon="pi pi-pencil"
          class="p-button-rounded p-button-text p-mr-2"
          @click="
            $router.push({
              name: 'UpdateBooking',
              params: { id: slotProps.data.id }
            })
          "
        />
        <Button
          label="Report"
          icon="pi pi-download"
          class="p-button-rounded p-button-secondary p-button-text"
        />
        <Button
          label="Delete"
          icon="pi pi-times"
          class="p-button-rounded p-button-danger p-button-text"
          @click="$emit('delete', slotProps.data.id)"
        />
      </template>
    </Column>
  </DataTable>
</template>

<script>
import { ref, computed } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Calendar from 'primevue/calendar';
import firebase from 'firebase/app';
export default {
  name: 'BookingsTable',
  components: { DataTable, Column, Button, InputText, Calendar },
  props: {
    data: {
      type: Array,
      default: new Array()
    }
  },
  setup(props) {
    const filters = ref({});
    const loading = computed(() => {
      return props.data.length ? false : true;
    });
    const dataFormatted = computed(() => {
      return props.data.map((row) => {
        if (row.datetime instanceof firebase.firestore.Timestamp)
          row.datetime = formatDate(row.datetime.toDate(), true);

        return row;
      });
    });

    function filterDate(value, filter) {
      if (
        filter === undefined ||
        filter === null ||
        (typeof filter === 'string' && filter.trim() === '')
      ) {
        return true;
      }

      if (value === undefined || value === null) {
        return false;
      }

      return value === formatDate(filter);
    }

    function formatDate(date, string = false) {
      if (date instanceof Date) {
        let month = date.getMonth() + 1;
        let day = date.getDate();

        if (month < 10) {
          month = '0' + month;
        }

        if (day < 10) {
          day = '0' + day;
        }

        if (string) {
          var options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
          };
          return date.toLocaleDateString('en-CA', options);
        }
        return date.getFullYear() + '-' + month + '-' + day;
      }
      return date;
    }

    function exportCSV() {
      this.$refs.dt.exportCSV();
    }

    return {
      filters,
      loading,
      dataFormatted,
      filterDate,
      formatDate,
      exportCSV
    };
  }
};
</script>

<style lang="scss">
.p-datatable-responsive {
  .table-header {
    display: flex;
    justify-content: space-between;
  }
  .p-column-filter {
    width: 100%;
  }
  .p-datepicker {
    min-width: 25rem;
    td {
      font-weight: 400;
    }
  }
}
/* Responsive */
.p-datatable-responsive .p-datatable-tbody > tr > td .p-column-title {
  display: none;
}
@media screen and (max-width: 40em) {
  .p-datatable-responsive {
    &.p-datatable {
      .p-datatable-thead > tr > th,
      .p-datatable-tfoot > tr > td {
        display: none !important;
      }
      .p-datatable-tbody > tr > td {
        text-align: left;
        display: block;
        width: 100%;
        float: left;
        clear: left;
        border: 0 none;
        .p-column-title {
          padding: 0.4rem;
          min-width: 30%;
          display: inline-block;
          margin: -0.4rem 1rem -0.4rem -0.4rem;
          font-weight: bold;
        }
        .p-progressbar {
          margin-top: 0.5rem;
        }
        &:last-child {
          border-bottom: 1px solid var(--surface-d);
        }
      }
    }
  }
}
</style>
