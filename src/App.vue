<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/users">Users</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return {
      displayConfirmation:false
    }
  },
  methods:{
    openConfirmation() {
      this.displayConfirmation = true;
    },
    closeConfirmation() {
      this.displayConfirmation = false;
    },
  }
}
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
