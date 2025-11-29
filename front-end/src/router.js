import Vue from 'vue';
import Router from 'vue-router';
import Words from './views/Words.vue';
import New from './views/New.vue';
import Show from './views/Show.vue';
import Edit from './views/Edit.vue';
import Test from './views/Test.vue';
import Search from './views/Search.vue';
import Flashcards from './views/Flashcards.vue';
import Quiz from './views/Quiz.vue';
import Matching from './views/Matching.vue';
import Login from './views/Login.vue';
import Register from './views/Register.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      redirect: '/words'
    },
    // --- KHU VỰC CÔNG CỘNG (Ai vào cũng được) ---
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    
    // --- KHU VỰC BẢO MẬT (Phải có Token mới được vào) ---
    // Thêm dòng meta: { requiresAuth: true } vào các trang này
    {
      path: '/words',
      name: 'words',
      component: Words,
      meta: { requiresAuth: true } 
    },
    {
      path: '/words/new',
      name: 'new-word',
      component: New,
      meta: { requiresAuth: true }
    },
    {
      path: '/words/search',
      name: 'search-word',
      component: Search,
      meta: { requiresAuth: true }
    },
    {
      path: '/quiz',
      name: 'quiz',
      component: Quiz,
      meta: { requiresAuth: true }
    },
    {
      path: '/matching',
      name: 'matching',
      component: Matching,
      meta: { requiresAuth: true }
    },
    {
      path: '/test',
      name: 'test',
      component: Test,
      meta: { requiresAuth: true }
    },
    {
      path: '/flashcards',
      name: 'flashcards',
      component: Flashcards,
      meta: { requiresAuth: true }
    },
    {
      path: '/words/:id/edit',
      name: 'edit',
      component: Edit,
      meta: { requiresAuth: true }
    },
    {
      path: '/words/:id',
      name: 'show',
      component: Show,
      meta: { requiresAuth: true }
    }
  ]
});

// --- BÁC BẢO VỆ (Logic chặn người lạ) ---
router.beforeEach((to, from, next) => {
  // 1. Kiểm tra xem trong túi (localStorage) có vé (token) chưa?
  const loggedIn = localStorage.getItem('token');

  // 2. Nếu nơi muốn đến (to) có biển cấm (requiresAuth) VÀ chưa có vé (!loggedIn)
  if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
    // 3. Đá về trang Login
    next('/login');
  } else {
    // 4. Cho qua
    next();
  }
});

export default router;