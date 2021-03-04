const path = require('path');
const setupEnv = require('./build/setupEnv');
const createDevProxy = require('./build/createDevProxy');
const globalEnv = setupEnv();

function resolve(dir = '') {
  return path.resolve(__dirname, 'src', dir);
}

function setup(env) {
  return {
    publicPath:
      process.env.NODE_ENV === 'production'
        ? process.env.SATPAM_ASSETS_URL
        : '/',
    productionSourceMap: false,
    devServer: createDevProxy(env),
    css: {
      loaderOptions: {
        scss: {
          additionalData: `
            @import "./src/styles/index.scss";
            
            $prefixClass: ${env.SATPAM_PREFIX_CLASS};
          `,
        },
      },
    },
    configureWebpack: {
      resolve: {
        alias: {
          vue$: require.resolve('vue/dist/vue.esm-browser.js'),
          '@': resolve(),
          '@common': resolve('components/commons'),
          '@base': resolve('components/fragments/@Base'),
          '@fragment': resolve('components/fragments'),
          '@layout': resolve('layouts'),
          '@mixin': resolve('mixins'),
          '@directive': resolve('directives'),
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
          '@data': path.resolve(__dirname, '.data'),
          __mock__: path.resolve(__dirname, '__mocks__'),
        },
      },
    },
    chainWebpack: config => {
      config.plugin('define').tap(args => {
        args[0] = env;

        return args;
      });

      config.module
        .rule('vue')
        .use('vue-svg-inline-loader')
        .loader('vue-svg-inline-loader');
    },
  };
}

module.exports = setup(globalEnv);
