/* eslint-disable */
import TokenManager from '@util/token';

export default function permissionGuard(router) {
  router.beforeEach((to, from, next) => {
    const token = TokenManager.getToken();

    console.log(to);
    if (to.path !== '/login' && !token && to.meta.authRequired) {
      TokenManager.flush();

      next({ name: 'Login' });
      return;
    }

    if (to.path === '/login' && token) {
      next('/');
      return;
    }

    next();
  });
}
