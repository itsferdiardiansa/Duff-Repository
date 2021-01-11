const path = require('path')

function resolve(dir = '') {
  return path.resolve(__dirname, 'src', dir)
}

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve(),
        '@common': resolve('components/common'),
        '@fragment': resolve('components/fragments'),
        '@layout': resolve('layouts'),
        '@page': resolve('pages')
      }
    }
  }
}