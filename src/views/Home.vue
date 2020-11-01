<template>
  <h1>Home Page</h1>
  <HelloWorld msg="Welcome to Your Vue.js App" />
  <Login />
</template>

<script>
import HelloWorld from '@/components/HelloWorld';
import Login from '@/components/Login';

export default {
  name: 'Home',
  components: {
    HelloWorld,
    Login,
  },
};
</script>
