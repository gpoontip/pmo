<template>
  <div id="app">
    <TheHeader />
    <TheMenu />
    <section id="content">
      <router-view />
    </section>
    <TheFooter />
  </div>
</template>

<script>
import TheHeader from '@/components/TheHeader';
import TheMenu from '@/components/TheMenu';
import TheFooter from '@/components/TheFooter';
export default {
  name: 'App',
  components: { TheHeader, TheMenu, TheFooter },
  data() {
    return {
      displayConfirmation: false
    };
  },
  computed: {
    auth() {
      return this.$store.getters.isAuthenticated;
    }
  },
  methods: {
    openConfirmation() {
      this.displayConfirmation = true;
    },
    closeConfirmation() {
      this.displayConfirmation = false;
    }
  },
  created() {
    this.$store.dispatch('autoLogin');
  }
};
</script>

<style lang="scss">
@import '@/scss/_variables.scss';
body {
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
#content {
  max-width: $app_width;
  padding: 0 1rem;
  margin: 0 auto;
  margin-top: 2rem;
}
</style>
