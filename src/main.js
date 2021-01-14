import { createApp } from 'vue'
import App from './App.vue'
import router from '@route'
import store from '@store'
import './app.scss'

createApp(App)
  .use(store)
  .use(router)
  .mount('#app')
