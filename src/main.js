import { createApp } from 'vue'
import App from './App.vue'
import { setupRouter } from '@route'
import store from '@store'
import { FontAwesomeIcon } from '@plugin/fontAwesome'
import '@style/index.scss'
import AlertPlugin from '@plugin/alert'

const app = createApp(App)


app.use(AlertPlugin)

// Vuex store
app.use(store)

// Font Awesome
app.component('font-awesome-icon', FontAwesomeIcon)

// Vue router
setupRouter(app)

// Mount app
app.mount('#app')
