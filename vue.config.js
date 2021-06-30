const setupEnv = require('./build/setupEnv');
const createDevProxy = require('./build/createDevProxy');
const pathsAlias = require('./config/pathsAlias');
const globalEnv = setupEnv();

const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = process.env.NODE_ENV === 'development';

function setup(env) {
  const config = {
    runtimeCompiler: true,
    assetsDir: 'assets-loket',
    publicPath: isProduction ? process.env.SATPAM_ASSETS_URL : '/',
    css: {
      requireModuleExtension: true,
      loaderOptions: {
        scss: {
          additionalData: `
            @import "./src/styles/index.scss";
            
            $prefixClass: ${env.SATPAM_PREFIX_CLASS};
          `,
        },
        css: {
          modules: {
            localIdentName: isProduction
              ? 'css-[hash:7]'
              : '[path][name]-[hash:base64:8]',
          },
        },
      },
    },
    configureWebpack: {
      resolve: {
        alias: pathsAlias,
      },
      devtool: isDevelopment ? 'source-map' : 'none',
      performance: {
        hints: false,
      },
      optimization: {
        runtimeChunk: 'single',
        splitChunks: {
          cacheGroups: {
            fontawesome: {
              test: /node_modules\/@fortawesome/,
              name: 'chunk-fontawesome',
              chunks: 'all',
            },
          },
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

  // it doesn't work when in production mode
  if (isDevelopment) config.devServer = createDevProxy(env);

  return config;
}

module.exports = setup(globalEnv);
