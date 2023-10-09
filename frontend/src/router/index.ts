import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AdminLoginView from '@/views/AdminLoginView.vue'
import AdminPanelView from '@/views/AdminPanelView.vue'
import SignupView from '@/views/SignupView.vue'
import UserPanelViewVue from '@/views/UserPanelView.vue'
import ProductListView from '@/views/ProductListView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/products',
      name: 'products',
      component: ProductListView
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignupView
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminLoginView
    },
    {
      //TO DO SNOWFLAKE
      path: '/user',
      name: 'user',
      component: UserPanelViewVue
    },
    {
      //TO DO SNOWFLAKE
      path: '/admin/panel',
      name: 'admin-panel',
      component: AdminPanelView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
