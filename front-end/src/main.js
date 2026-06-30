import Vue from 'vue';
import App from './App.vue';
import router from './router'; // <-- Nạp "bản đồ" router
import 'semantic-ui-css/semantic.css'; // <-- Nạp thư viện CSS

Vue.config.productionTip = false;

new Vue({
  router, // <-- Kích hoạt router cho ứng dụng
  render: h => h(App)
}).$mount('#app');