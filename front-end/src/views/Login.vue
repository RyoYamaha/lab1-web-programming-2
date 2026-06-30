<template>
  <div class="ui container centered-form">
    <h1>Login</h1>
    <form class="ui form" @submit.prevent="onLogin">
      <div class="field">
        <label>Email</label>
        <input type="email" v-model="email" placeholder="Email" required>
      </div>
      <div class="field">
        <label>Password</label>
        <input type="password" v-model="password" placeholder="Password" required>
      </div>
      <button class="ui button green" type="submit">Login</button>
    </form>
    <p style="margin-top: 10px;">
      Don't have an account? <router-link to="/register">Register here</router-link>
    </p>
  </div>
</template>

<script>
import { api } from '../helpers/helpers';

export default {
  name: 'Login',
  data() {
    return { email: '', password: '' };
  },
  methods: {
    async onLogin() {
      try {
        const response = await api.login({ email: this.email, password: this.password });
        // Lưu token vào bộ nhớ trình duyệt
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        
        alert('Login successful!');
        this.$router.push('/words'); // Chuyển về trang chủ
        window.location.reload(); // Load lại để cập nhật menu
      } catch (error) {
        alert('Login failed! Check your email or password.');
      }
    }
  }
};
</script>

<style scoped>
.centered-form { max-width: 400px; margin-top: 50px; }
</style>