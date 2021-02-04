import { nextTick } from 'vue'

const DEFAULT_TITLE = 'Admin'

export default function asyncComponent(router) {
  /* eslint-disable no-unused-vars */
  router.beforeEach((to, from, next) => {
    let routeComponents = [].concat(to.matched)

    to.meta = {
      ...to.meta,
      components: routeComponents.pop().components,
      breadcrumbs: to.matched,
    }

    nextTick(() => {
      document.title = to.name || DEFAULT_TITLE
    })

    next()
  })
}
