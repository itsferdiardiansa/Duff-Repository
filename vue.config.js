const path = require('path')
const setupEnv = require('./config/env/setupEnv')

function resolve(dir = '') {
  return path.resolve(__dirname, 'src', dir)
}

const root = process.cwd()
const globalEnv = setupEnv()

function setup(env) {
  return {
    devServer: {
      port: env.MP2_APP_PORT,
      proxy: {
        '^/api': {
          target: 'http://localhost:8081',
          changeOrigin: true,
          secure: false,
          pathRewrite: {'^/api': '/api'},
          logLevel: 'debug' 
        },
      }
    },
    css: {
      loaderOptions: {
        scss: {
          additionalData: `@import "./src/styles/_variables.scss";`
        },
      }
    },
    configureWebpack: {
      resolve: {
        alias: {
          'vue$': require.resolve('vue/dist/vue.esm-browser.js'),
          '@': resolve(),
          '@common': resolve('components/commons'),
          '@fragment': resolve('components/fragments'),
          '@layout': resolve('layouts'),
          '@page': resolve('pages'),
          '@route': resolve('routes'),
          '@store': resolve('store'),
          '@lib': resolve('libs'),
          '@util': resolve('utils'),
          '@plugin': resolve('plugins'),
          '@asset': resolve('assets'),
          '@icon': resolve('assets/icons'),
          '@style': resolve('styles'),
          '@service': resolve('services'),
          '@mock': path.resolve(__dirname, '.mocks'),
        },
      },
    },
    chainWebpack: config => {
      config.plugin('define').tap(args => {
        let _base = args[0]['process.env']
        
        args[0]['process.env'] = {
          ..._base,
          ...env
        }
        return args
      })
      
      config.plugin('html').tap(args => {
        args[0].title = JSON.parse(env.MP2_APP_TITLE)

        return args
      })

      config.module
        .rule('vue')
        .use('vue-svg-inline-loader')
        .loader('vue-svg-inline-loader')
    },
  }
}

module.exports = setup(globalEnv)
