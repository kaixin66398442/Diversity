import { createRouter, createWebHistory , RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name:'editor',
    component: () => import('@/views/Editor.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
