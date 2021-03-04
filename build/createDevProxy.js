const createDevProxy = env => {
  const { SATPAM_API_PROXY, SATPAM_APP_PORT } = env;
  let proxy;

  for (const { path, host, pathRewrite } of SATPAM_API_PROXY) {
    proxy = {
      ...proxy,
      [path]: {
        target: host,
        changeOrigin: true,
        secure: false,
        logLevel: 'debug',
        pathRewrite,
      },
    };
  }

  return {
    port: SATPAM_APP_PORT,
    proxy,
  };
};

module.exports = createDevProxy;
