
// export default function middlewareComponent(router) {
//   let components = new Map()

//   router.beforeEach((to, from, next) => {
//     to.meta.components = {
//       ...to.meta.components,
//       loaded: true
//     }
    
//     console.log('middleware', to)
//     next()
//   })
  
//   router.afterEach(to => {
//     components.set(to.path, true)
//   })
// }