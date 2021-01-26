import { createRouter, createWebHistory } from 'vue-router'
import DashboardRoutes from './dashboard'
import asyncComponent from './helper/asyncComponent'
import MAIN_LAYOUT from '@layout/MainLayout'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: MAIN_LAYOUT,
      redirect: '/hero',
      children: [...DashboardRoutes],
    },
  ],
})

export const setupRouter = app => {
  asyncComponent(router)

  app.use(router)
}
