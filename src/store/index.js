import { createLogger, createStore } from 'vuex'
import http from '@helper/http'

const isProduction = process.env.NODE_ENV === 'production'

const files = require.context('./modules', true, /index.js/)
const modules = {}

files.keys().forEach(file => {
  const moduleName = file.replace(/(\.\/|\/index.js)/g, '')

  modules[moduleName] = files(file).default || files(file)

  modules[moduleName].namespaced = true
})

/**
 * Custom plugins
 *
 * @param {Object} store
 */
const httpPlugins = store => {
  store.$http = params => http.setup(params)
}

let _plugins = [httpPlugins]

if (!isProduction) _plugins.push(createLogger())

export default createStore({
  modules,
  strict: isProduction,
  plugins: _plugins,
})
