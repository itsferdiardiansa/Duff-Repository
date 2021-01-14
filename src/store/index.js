import { createLogger, createStore } from 'vuex'

const isProduction = process.env.NODE_ENV === 'production'

const files = require.context('./modules', true, /index.js/);
const modules = {}

files.keys().forEach((file) => {

  const moduleName = file.replace(/(\.\/|\/index.js)/g, '');

  modules[moduleName] = files(file).default || files(file);

  modules[moduleName].namespaced = true;
});

export default createStore({
  modules,
  strict: isProduction,
  plugins: !isProduction ? [createLogger()] : []
})