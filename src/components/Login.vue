<template>
  <div class="p-d-flex p-jc-center">
    <form @submit.prevent="login">
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
      <Button label="Login" type="submit" />
      <Button label="Register" @click="register" />
    </form>
    <Toast />
  </div>
</template>

<script>
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Toast from 'primevue/toast';

export default {
  name: 'HelloWorld',
  components: {
    Button,
    InputText,
    Toast
  },
  data() {
    return {
      email: null,
      password: null
    };
  },
  methods: {
    login() {
      this.$store
        .dispatch('login', {
          email: this.email,
          password: this.password
        })
        .then(() => {
          this.$toast.add({
            severity: 'success',
            summary: 'Success Message',
            detail: 'Login Success',
            life: 3000
          });
          this.$router.push(this.$store.state.entryUrl);
        })
        .catch((err) => {
          this.$toast.add({
            severity: 'error',
            summary: 'Login Failed',
            detail: err.message,
            life: 3000
          });
        });
    },
    register() {
      this.$store
        .dispatch('signup', {
          email: this.email,
          password: this.password
        })
        .catch((err) => {
          console.log('catch', err);
          this.$toast.add({
            severity: 'error',
            summary: 'Registration Failed',
            detail: err.message,
            life: 3000
          });
        });
    }
  }
};
</script>
