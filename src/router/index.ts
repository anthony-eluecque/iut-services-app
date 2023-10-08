// Composables
import { authGuard } from '@/guards/auth.guard'
import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'

const routes: RouteRecordRaw[] = [
  
  {
    path: '/home',
    name: 'Home',
    beforeEnter: authGuard,
    component: () => import('@/pages/Home.page.vue'),
  },
  {
    path: '/services',
    name : 'Services',
    beforeEnter: authGuard,
    component: () => import('@/pages/Services.page.vue'),
  },
  {
    path: '/login',
    name : 'Login',
    component: () => import('@/pages/Login.page.vue'),
  },
  {
    path : '/services/:id',
    name : 'ServicesDetails',
    component: () => import('@/pages/Details.page.vue'),
    props: route => ({
      id: route.params.id,
      itemToOpenJSON: route.query.itemToOpenJSON ? JSON.parse(route.query.itemToOpenJSON as string) : null,
    }),
  },
  {
    path: '/directory',
    name : 'Directory',
    component: () => import(/* webpackChunkName: "home" */ '@/pages/Directory.page.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
