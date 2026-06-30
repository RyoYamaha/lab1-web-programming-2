<template>
  <div class="search-word">
    <h1>Search Word</h1>

    <div class="search-form">
      <input
        type="text"
        v-model="query"
        @keyup.enter="searchWord"
        placeholder="Enter a word to search"
      />
      <button @click="searchWord">Search</button>
    </div>

    <div v-if="loading">Loading...</div>

    <div v-if="results.length > 0">
      <ul>
        <li v-for="word in results" :key="word._id">
        <strong>{{ word.english }}</strong>: {{ word.german }}
        </li>
      </ul>
    </div>

    <div v-else-if="!loading && query">No results found.</div>
  </div>
</template>

<script>
import { api } from '../helpers/helpers';

export default {
  name: 'SearchWord',
  data() {
    return {
      query: '',       // từ cần tìm
      results: [],     // kết quả trả về
      loading: false,  // trạng thái loading
    };
  },
  methods: {
    async searchWord() {
      if (!this.query) return;

      this.loading = true;
      try {
        // Gọi API searchWord
        const response = await api.searchWord(this.query);
        // Đảm bảo response luôn là mảng
        this.results = Array.isArray(response) ? response : [];
      } catch (err) {
        console.error('Search error:', err);
        this.results = [];
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>
.search-word {
  max-width: 600px;
  margin: 2em auto;
  text-align: center;
}

.search-form {
  display: flex;
  justify-content: center;
  gap: 0.5em;
  margin-bottom: 1em;
}

input {
  width: 300px;
  padding: 0.5em;
  font-size: 1em;
}

button {
  padding: 0.5em 1em;
  font-size: 1em;
  cursor: pointer;
}

ul {
  list-style: none;
  padding: 0;
  margin-top: 1em;
  text-align: left;
}

li {
  padding: 0.3em 0;
}
</style>
