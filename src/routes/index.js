import { createRouter, createWebHistory } from 'vue-router';
import DashboardRoutes from './dashboard';
import setupRouter from './guard/setupRouter';
import NotFoundPage from '@page/Error/404';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () =>
        import(/** webpackChunkName "layout.main" */ '@layout/MainLayout'),
      redirect: '/hero',
      children: [...DashboardRoutes],
      meta: {
        authRequired: true,
      },
    },
    {
      name: 'Login',
      path: '/login',
      component: () =>
        import(/* webpackChunkName "page.login" */ '@page/Login'),
    },
    {
      name: 'Page Not Found',
      path: '/:pathMatch(.*)*',
      component: NotFoundPage,
    },
  ],
});

if (process.env.NODE_ENV === 'development')
  router.addRoute({
    path: '/ui-kit',
    name: 'UI Kit',
    component: () =>
      import(/** webpackChunkName "lk-admin-ui-kit" */ '@page/UIKit'),
  });

export const createAppRouter = app => {
  setupRouter(router, app);

  app.use(router);
};

export default router;
