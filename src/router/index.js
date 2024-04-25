import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import DetailUserView from '../views/DetailUserView.vue'
import RegisterView from '../views/RegisterView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {'title' : 'Login'},
    },
    {
      path: '/users/:username',
      name: 'detail.user',
      component: DetailUserView,
      meta: {'title' : 'Detail Account'}
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: {'title' : 'Register'}
    },
  ]
})

router.beforeEach((to, from) => {
  document.title = to.meta?.title ?? 'Facegram'
});

export default router