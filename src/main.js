import { createApp } from 'vue'
import App from './App.vue'
import { setupRouter } from '@route'
import store from '@store'
import './app.scss'

const app = createApp(App)

// Vuex store
app.use(store)

// Vue router
setupRouter(app)

app.mount('#app')
