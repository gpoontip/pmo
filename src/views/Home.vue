<template>
  <h1>Home Page</h1>
  <h2 v-if="name">{{ name }}</h2>
  <HelloWorld msg="Welcome to Your Vue.js App" />
  <Login />
  <Toast />
</template>

<script>
import HelloWorld from '@/components/HelloWorld';
import Login from '@/components/Login';
import Toast from 'primevue/toast';

export default {
  name: 'Home',
  components: {
    HelloWorld,
    Login,
    Toast
  },
  computed: {
    name() {
      return !this.$store.getters.user ? false : this.$store.getters.user.email;
    },
    auth() {
      return this.$store.getters.isAuthenticated;
    }
  },
  watch: {
    auth: {
      immediate: true,
      handler(newVal) {
        if (newVal) this.$store.dispatch('fetchUser');
      }
    }
  },
  mounted() {
    this.$toast.add({
      severity: 'success',
      summary: 'Success Message',
      detail: 'Order submitted',
      life: 3000
    });
  }
};
</script>
