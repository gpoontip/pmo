<template>
  <header class="p-pt-3 p-pb-1">
    <div id="header" class="p-d-flex p-jc-between">
      <Logo :height="70" :width="200" />
      <div>
        <Button
          icon="pi pi-user"
          class="p-button-rounded p-button-text"
          v-tooltip.top="'Account'"
        />
        <Button
          @click="toggle"
          icon="pi pi-cog"
          class="p-button-rounded p-button-text"
          v-tooltip.top="'Settings'"
        />
        <Button
          @click="$store.dispatch('logout')"
          icon="pi pi-power-off"
          class="p-button-text"
          v-tooltip.top="'Logout'"
        />
        <OverlayPanel ref="settings" :dismissable="true">
          <ul>
            <li>
              <Button
                label="Patients"
                icon="pi pi-users"
                class="p-button-text p-button-sm"
                @click="click('Home')"
              />
            </li>
            <li>
              <Button
                label="Locations"
                icon="pi pi-map-marker"
                class="p-button-text p-button-sm"
                @click="click('Home')"
              />
            </li>
            <li>
              <Button
                label="Users"
                icon="pi pi-lock"
                class="p-button-text p-button-sm"
                @click="click('Users')"
              />
            </li>
          </ul>
        </OverlayPanel>
      </div>
    </div>
  </header>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Logo from '@/components/Logo';
import Button from 'primevue/button';
import OverlayPanel from 'primevue/overlaypanel';
import Tooltip from 'primevue/tooltip';

export default {
  components: { Logo, Button, OverlayPanel },
  directives: {
    tooltip: Tooltip
  },
  setup() {
    const settings = ref(null);
    const router = useRouter();
    function toggle(event) {
      console.log(event);
      settings.value.toggle(event);
    }
    function click(name) {
      settings.value.hide();
      router.push({ name });
    }
    return { settings, toggle, click };
  }
};
</script>

<style lang="scss" scoped>
@import '@/scss/_variables.scss';
header {
  background: $brand_color;
}
ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
#header {
  @include app-container;
}
.p-overlaypanel {
  margin-top: 0;
  &:after,
  &:before {
    display: none;
  }
  ::v-deep(.p-overlaypanel-content) {
    padding: 0.5rem;
  }
}
.p-button {
  width: 100%;
  text-align: left;
}
</style>
