<template>
  <div class="ui container centered-form">
    <h1>Register</h1>
    <form class="ui form" @submit.prevent="onRegister">
      <div class="field">
        <label>Name</label>
        <input type="text" v-model="name" required>
      </div>
      <div class="field">
        <label>Email</label>
        <input type="email" v-model="email" required>
      </div>
      <div class="field">
        <label>Password</label>
        <input type="password" v-model="password" required>
      </div>
      <button class="ui button blue" type="submit">Register</button>
    </form>
  </div>
</template>

<script>
import { api } from '../helpers/helpers';

export default {
  name: 'Register',
  data() { return { name: '', email: '', password: '' }; },
  methods: {
    async onRegister() {
      try {
        await api.register({ name: this.name, email: this.email, password: this.password });
        alert('Registered successfully! Please login.');
        this.$router.push('/login');
      } catch (error) {
        alert('Registration failed.');
      }
    }
  }
};
</script>

<style scoped>
.centered-form { max-width: 400px; margin-top: 50px; }
</style>