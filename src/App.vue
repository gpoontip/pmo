<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/users">Users</router-link> |
      <a v-if="auth" href="#" @click="$store.dispatch('logout')">Logout</a>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      displayConfirmation: false,
    };
  },
  computed: {
    auth() {
      return this.$store.getters.isAuthenticated;
    },
  },
  methods: {
    openConfirmation() {
      this.displayConfirmation = true;
    },
    closeConfirmation() {
      this.displayConfirmation = false;
    },
  },
  created() {
    this.$store.dispatch('autoLogin');
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}

.confirmation-content {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
