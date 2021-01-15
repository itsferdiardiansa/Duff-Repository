const path = require('path')

function resolve(dir = '') {
  return path.resolve(__dirname, 'src', dir)
}

module.exports = {
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
        '@helper': resolve('helpers'),
        '@asset': resolve('assets'),
        '@icon': resolve('assets/icons'),
        '@mock': path.resolve(__dirname, '.mocks'),
      },
    },
  },
  chainWebpack: config => {
    config.plugin('define').tap(args => {
      let _base = args[0]['process.env']

      args[0]['process.env'] = {
        ..._base,
        API_URL: JSON.stringify(process.env.API_URL),
      }
      return args
    })

    config.module
      .rule('vue')
      .use('vue-svg-inline-loader')
      .loader('vue-svg-inline-loader')
  },
}
