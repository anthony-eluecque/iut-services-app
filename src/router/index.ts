// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  
  {
    path: '/home',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
  },
  {
    path: '/services',
    name : 'Services',
    component: () => import(/* webpackChunkName: "home" */ '@/views/Services.vue'),
  },
  {
    path: '/mentions',
    name : 'Mentions',
    component: () => import(/* webpackChunkName: "home" */ '@/views/Legal_Notice.vue'),
  }
]



const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
