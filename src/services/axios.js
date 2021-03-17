import axios from 'axios';

function Axios(options = {}) {
  this.options = options;
  this.instance = axios.create(options);

  this.setupInstance();
}

Axios.prototype.setupInstance = function () {
  const {
    transform: {
      requestInterceptors,
      // requestIngterceptorsError,
      responseInterceptors,
      responseInterceptorsError,
    },
  } = this.options;

  this.instance.interceptors.request.use(config => {
    if (typeof requestInterceptors === 'function')
      config = requestInterceptors(config);
    return config;
  }, undefined);

  this.instance.interceptors.response.use(
    responseInterceptors,
    responseInterceptorsError
  );
};

Axios.prototype.requestCancel = null;

Axios.prototype.request = function (config, options) {
  this.requestCancel = axios.CancelToken.source();
  const { transform, requestOptions } = this.options;
  const { preRequestHooks } = transform;

  let mergeOptions = Object.assign({}, requestOptions, options, {
    cancelToken: this.requestCancel.token,
  });
  let configMap = preRequestHooks(config, mergeOptions);

  return new Promise((resolve, reject) => {
    this.instance
      .request(configMap)
      .then(response => {
        setTimeout(() => {
          resolve(response);
        }, 500);
      })
      .catch(error => {
        setTimeout(() => {
          reject(error);
        }, 500);
      });
  });
};

export default Axios;
