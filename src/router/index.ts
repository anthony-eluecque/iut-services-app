// Composables
import { authGuard } from '@/guards/auth.guard'
import { changePasswordGuard } from '@/guards/change-password.guard'
import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path : '/',
    component : () => import('@/layouts/Default.layout.vue'),
    beforeEnter: authGuard,
    children : [
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/pages/home/Home.page.vue'),
      },
      {
        path: '/services',
        name : 'Services',
        component: () => import('@/pages/services/Services.page.vue'),
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
        component: () => import('@/pages/directory/Directory.page.vue')
      },
      {
        path: '/notices',
        name : 'LegalNotices',
        component: () => import('@/pages/legal-notice/Legal-notice.page.vue')
      }
    ]
  },
  {
    path : '',
    component : () => import('@/layouts/Default.layout.vue'),
    beforeEnter: authGuard,
    children : [
      {
        path : '/users',
        name : 'Users',
        component : () => import('@/pages/admin/Admin.page.vue')
      }
    ]
  },
  {
    path: '/login',
    name : 'Auth',
    component : () => import('@/layouts/NoSidebar.layout.vue'),
    children : [
      {
        path: '',
        name : 'login-form',
        component: () => import('@/pages/login/Login.page.vue'),
      }
    ]
  },
  {
      path: '/changePassword',
      name : 'ChangePassword',
      beforeEnter: changePasswordGuard,
      component: () => import('@/pages/change-password/change-password.page.vue'),
  },
  {
    path: '/changePasswordExpirate',
    name : 'changePasswordExpirate',
    component: () => import('@/pages/expirate-not-found/Expirate-not-found.page.vue'),
},
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
