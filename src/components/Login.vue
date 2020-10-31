<template>
  <div class="p-d-flex p-jc-center">
    <form>
      <div class="p-fluid">
        <div class="p-field">
          <InputText type="text" v-model="email" placeholder="Email" />
        </div>
        <div class="p-field">
          <InputText
            type="password"
            v-model="password"
            placeholder="Password"
          />
        </div>
      </div>
      <Button label="Submit" @click="login" />
    </form>
  </div>
</template>

<script>
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';

export default {
  name: 'HelloWorld',
  components: {
    Button,
    InputText,
  },
  data() {
    return {
      email: null,
      password: null,
    };
  },
  methods: {
    login() {},
  },
};
</script>
