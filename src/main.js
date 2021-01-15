import { createApp } from 'vue'
import App from './App.vue'
import router from '@route'
import store from '@store'
import './app.scss'

/* eslint-disable no-unused-vars */
router.beforeEach(async to => {
  // console.log(to)
  // let _c = await to.matched[1].components.default()
  // let layout = await (() => import(`@layout/${_c.default.layout}`))
  // // console.log(_c)
  // _c.default.render(layout)
  // next()
})

createApp(App).use(store).use(router).mount('#app')
