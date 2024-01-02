import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AdminLoginView from '@/views/AdminLoginView.vue'
import AdminPanelView from '@/views/AdminPanelView.vue'
import SignupView from '@/views/SignupView.vue'
import UserPanelViewVue from '@/views/UserPanelView.vue'
import ProductListView from '@/views/ProductListView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import HelpView from '@/views/HelpView.vue'
import ProductViewVue from '@/views/ProductView.vue'
import CheckoutView from '@/views/CheckoutView.vue'
import CheckoutSummaryView from '@/views/CheckoutSummaryView.vue'
import ActivateAccountView from '@/views/ActivateAccountView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/:catchAll(.*)",
      component: NotFoundView,
    },
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
      path: '/new-user/:activationKey',
      name: 'activateAccount',
      component: ActivateAccountView,
      props: true
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminLoginView
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: CheckoutView
    },
    {
      path: '/checkout/summary',
      name: 'summary',
      component: CheckoutSummaryView
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
      //TO DO SNOWFLAKE
      path: '/product/',
      name: 'product',
      component: ProductViewVue
    },
    {
      path: '/help',
      name: 'help',
      component: HelpView
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
