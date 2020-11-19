<template>
  <h2>Assign Testers</h2>

  <form @submit.prevent="onSubmit">
    <AutoComplete
      :multiple="true"
      v-model="testers"
      :suggestions="filteredUsers"
      @complete="searchUsers($event)"
      placeholder="Email"
      field="email"
    />
    <Button type="submit">Assign</Button>

    <ul>
      <li v-for="tester in booking.testers" :key="tester.id">
        {{ tester.email }}
        <Button
          icon="pi pi-times"
          class="p-button-rounded p-button-danger p-button-text"
          @click="removeTester(tester.id)"
        />
      </li>
    </ul>
  </form>
</template>

<script>
import { ref } from 'vue';
import AutoComplete from 'primevue/autocomplete';
import Button from 'primevue/button';
export default {
  components: { AutoComplete, Button },
  props: {
    users: {
      type: Array,
      default: new Array()
    },
    booking: {
      type: Object,
      default: new Object()
    }
  },
  emits: ['submitted'],
  setup(props, { emit }) {
    const testers = ref(null);
    const filteredUsers = ref([]);

    function searchUsers(event) {
      if (!event.query.trim().length) {
        filteredUsers.value = [...props.users];
      } else {
        filteredUsers.value = props.users.filter((user) => {
          return user.email.toLowerCase().startsWith(event.query.toLowerCase());
        });
      }
    }

    function removeTester(testerId) {
      const users = props.booking.testers.filter((tester) => {
        if (tester.id !== testerId) return true;
      });
      emit('submitted', users);
    }

    function onSubmit() {
      const users = props.booking.testers;
      testers.value.forEach((row) => {
        users.push(row);
      });
      emit('submitted', users);
      testers.value = null; // clear text field
    }

    return { testers, filteredUsers, searchUsers, removeTester, onSubmit };
  }
};
</script>
