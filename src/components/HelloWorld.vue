<template>
  <img alt="Vue logo" src="../assets/logo.png" />
  <h1>{{ msg }}</h1>
  <h2>Employees</h2>
  <ul>
    <li v-for="(employee, index) in employeesData" :key="index">
      {{ employee.name }}
      <Button
        label="Update"
        @click="updateEmployee(employee.id, 'Jane Doe', date)"
      />
      <Button label="Delete" @click="deleteEmployee(employee.id)" />
    </li>
  </ul>
  <Button label="Confirm" @click="openConfirmation" />
  <br />
  <Button label="Create Employee" @click="createEmployee(name, date)" />
  <Dialog
    header="Confirmation"
    v-model:visible="displayConfirmation"
    :style="{ width: '350px' }"
    :modal="true"
  >
    <div class="confirmation-content">
      <i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
      <span>Are you sure you want to proceed?</span>
    </div>
    <template #footer>
      <Button
        label="No"
        icon="pi pi-times"
        @click="closeConfirmation"
        class="p-button-text"
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        @click="closeConfirmation"
        class="p-button-text"
        autofocus
      />
    </template>
  </Dialog>
</template>

<script>
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import { db } from '@/firebaseConfig';

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  components: {
    Button,
    Dialog
  },
  data() {
    return {
      displayConfirmation: false,
      date: new Date().toISOString().slice(0, 10),
      name: 'John Doe',
      employeesData: []
    };
  },
  methods: {
    openConfirmation() {
      this.displayConfirmation = true;
    },
    closeConfirmation() {
      this.displayConfirmation = false;
    },
    createEmployee(name, date) {
      db.collection('employees')
        .add({ date: date, name: name })
        .then(() => {
          console.log('Document successfully written!');
          this.readEmployees();
        })
        .catch((error) => {
          console.error('Error writing document: ', error);
        });
    },
    readEmployees() {
      db.collection('employees')
        .get()
        .then((querySnapshot) => {
          this.employeesData = [];
          querySnapshot.forEach((doc) => {
            this.employeesData.push({
              id: doc.id,
              name: doc.data().name,
              date: doc.data().date
            });
          });
        })
        .catch((error) => {
          console.log('Error getting documents: ', error);
        });
    },
    updateEmployee(id, name, date) {
      db.collection('employees')
        .doc(id)
        .update({
          name: name,
          date: date
        })
        .then(() => {
          console.log('Document successfully updated!');
          this.readEmployees();
        })
        .catch((error) => {
          // The document probably doesn't exist.
          console.error('Error updating document: ', error);
        });
    },
    deleteEmployee(id) {
      db.collection('employees')
        .doc(id)
        .delete()
        .then(() => {
          console.log('Document successfully deleted!');
          this.readEmployees();
        })
        .catch((error) => {
          console.error('Error removing document: ', error);
        });
    }
  },
  mounted() {
    this.readEmployees();
  }
};
</script>
