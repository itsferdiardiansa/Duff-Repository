const createDevProxy = (env) => {
  const { MP2_API_PROXY, MP2_APP_PORT } = env
  let proxy
  
  for (const {path, host, pathRewrite} of MP2_API_PROXY) {
    proxy = {
      [path] : {
        target: host,
        changeOrigin: true,
        secure: false,
        logLevel: 'debug', 
        pathRewrite
      }
    }
  }

  return {
    port: MP2_APP_PORT,
    proxy
  }
}

module.exports = createDevProxy