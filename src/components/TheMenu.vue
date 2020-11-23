<template>
  <nav id="nav">
    <TabMenu :model="items" />
  </nav>
</template>

<script>
import TabMenu from 'primevue/tabmenu';
export default {
  components: { TabMenu },
  data() {
    return {
      items: [
        {
          label: 'Calendar',
          icon: 'pi pi-fw pi-calendar',
          to: '/calendar'
        },
        {
          label: 'Create Booking',
          icon: 'pi pi-fw pi-plus',
          to: '/create-booking'
        },
        {
          label: 'Requested Bookings',
          icon: 'pi pi-fw pi-file',
          to: '/requested-bookings'
        }
      ]
    };
  },
  computed: {
    auth() {
      return this.$store.getters.isAuthenticated;
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/scss/_variables.scss';
#nav {
  @include app-container;
}
.p-tabmenu {
  ::v-deep(.p-tabmenuitem) {
    margin-top: 2px;
  }
}
</style>
