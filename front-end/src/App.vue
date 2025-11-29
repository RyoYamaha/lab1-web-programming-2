<template>
  <div id="app">
    <div class="ui inverted segment navbar">
      <div class="ui center aligned container">
        <div class="ui large secondary inverted pointing menu compact">
          
          <router-link v-if="isLoggedIn" to="/words" class="item">Words</router-link>
          <router-link v-if="isLoggedIn" to="/words/new" class="item">New</router-link>
          <router-link v-if="isLoggedIn" to="/test" class="item">Test</router-link>
          <router-link v-if="isLoggedIn" to="/flashcards" class="item">Flashcards</router-link>
          <router-link v-if="isLoggedIn" to="/quiz" class="item">Quiz</router-link>
          <router-link v-if="isLoggedIn" to="/matching" class="item">Matching</router-link>
          
          <div class="right menu">
            <router-link v-if="!isLoggedIn" to="/login" class="item">Login</router-link>
            <a v-else class="item" @click="logout">Logout</a>
          </div>

        </div>
      </div>
    </div>

    <div class="ui text container">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      isLoggedIn: false
    };
  },
  created() {
    // Kiểm tra xem có token trong máy không
    const token = localStorage.getItem('token');
    if (token) {
      this.isLoggedIn = true;
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.isLoggedIn = false;
      this.$router.push('/login');
    }
  }
};
</script>