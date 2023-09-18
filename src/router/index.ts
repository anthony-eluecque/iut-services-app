// Composables
import { authGuard } from '@/guards/auth.guard'
import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'

const routes: RouteRecordRaw[] = [
  
  {
    path: '/home',
    name: 'Home',
    beforeEnter: authGuard,
    component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
  },
  {
    path: '/services',
    name : 'Services',
    beforeEnter: authGuard,
    component: () => import(/* webpackChunkName: "home" */ '@/views/Services.vue'),
  },
  {
    path: '/login',
    name : 'Login',
    component: () => import(/* webpackChunkName: "home" */ '@/views/Login.vue'),
  },
  {
    path : '/services/:id',
    name : 'ServicesDetails',
    component: () => import(/* webpackChunkName: "home" */ '@/views/Details.vue'),
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
