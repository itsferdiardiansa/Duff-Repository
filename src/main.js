/* eslint-disable no-unused-vars */
import { createApp } from 'vue';
import App from './App.vue';
import { createAppRouter } from '@route';
import store from '@store';
import { FontAwesomeIcon } from '@plugin/fontAwesome';
import AlertPlugin from '@plugin/alert';
import ModalPlugin from '@plugin/modal';
import '@style/main.scss';

const app = createApp(App);

// Alert plugin
app.use(AlertPlugin);

// Modal Plugin
app.use(ModalPlugin);

// Vuex store
app.use(store);

// Font Awesome
app.component('font-awesome-icon', FontAwesomeIcon);

// Vue router
createAppRouter(app);

// Mount app
app.mount('#app');
