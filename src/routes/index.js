import { createRouter, createWebHistory } from 'vue-router'
import WebRoutes from './web'

export default createRouter({
  history: createWebHistory(),
  routes: [
    ...WebRoutes
  ]
})