const path = require('path')

function resolve(dir = '') {
  return path.resolve(__dirname, 'src', dir)
}

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve(),
        '@common': resolve('components/commons'),
        '@fragment': resolve('components/fragments'),
        '@layout': resolve('layouts'),
        '@page': resolve('pages'),
        '@route': resolve('routes'),
        '@store': resolve('store'),
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
  },
}
