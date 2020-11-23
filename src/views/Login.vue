<template>
  <Login />
</template>

<script>
import Login from '@/components/Login';

export default {
  name: 'Home',
  components: {
    Login
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
  }
};
</script>
