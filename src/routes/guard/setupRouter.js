
import asyncComponent from './asyncComponent'
// import middlewareComponent from './middlewareComponent'

export default function setupRouter(router, app) {
  // middlewareComponent(router)
  asyncComponent(router, app)
}