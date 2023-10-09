// Composables
import { authGuard } from '@/guards/auth.guard'
import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'

const routes: RouteRecordRaw[] = [
  
  {
    path: '/home',
    name: 'Home',
    beforeEnter: authGuard,
    component: () => import('@/pages/home/Home.page.vue'),
  },
  {
    path: '/services',
    name : 'Services',
    beforeEnter: authGuard,
    component: () => import('@/pages/services/Services.page.vue'),
  },
  {
    path: '/login',
    name : 'Login',
    component: () => import('@/pages/login/Login.page.vue'),
  },
  {
    path : '/services/:id',
    name : 'ServicesDetails',
    component: () => import('@/pages/details/Details.page.vue'),
    props: route => ({
      id: route.params.id,
      itemToOpenJSON: route.query.itemToOpenJSON ? JSON.parse(route.query.itemToOpenJSON as string) : null,
    }),
  },
  {
    path: '/directory',
    name : 'Directory',
    component: () => import('@/pages/directory/Directory.page.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
