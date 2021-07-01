/* eslint-disable */
import CAxios from './axios';
import errorCode from './vars/errorCode';
import TokenManager from '@util/token';
import checkStatus from './checkStatus';
import router from '@route';

const transform = {
  preRequestHooks: (config, options) => {
    const { joinPrefix } = options;

    if (joinPrefix) config.url = SATPAM_API_PREFIX + config.url;

    config.requestOptions = Object.assign({}, config.requestOptions, options);

    return Object.assign(config, options);
  },
  requestInterceptors: config => {
    const token = TokenManager.getToken();

    config.headers.Clientkey = SATPAM_API_KEY;

    if (!navigator.onLine) {
      SSNotification('dark', 'Please check your internet connection');
      return;
    }

    // Set toke to Header
    if (token) config.headers.Authorization = 'Bearer ' + token;

    return config;
  },
  requestIngterceptorsError: error => {
    let opr = error;

    return opr;
  },
  responseInterceptors: response => {
    return response;
  },
  responseInterceptorsError: errorResponse => {
    const {
      response,
      code,
      message,
      config: { requestOptions },
    } = errorResponse || {};

    try {
      if (
        Boolean(~message.indexOf('timeout')) &&
        requestOptions?.errorNotification
      ) {
        SSNotification('danger', 'Request has exceeded the time limit');
        // return
        throw { timeout: true };
      } else if (
        (errorCode.includes(code) || message?.includes('Network Error')) &&
        requestOptions?.errorNotification
      ) {
        SSNotification('danger', "Can't connect to server");
        // return
        throw { server: true };
      }

      if ([403].includes(response?.status)) {
        TokenManager.flush();

        SSNotification('danger', 'Session expired');

        setTimeout(() => {
          router.push({ name: 'Login' });
        }, 2000);

        return;
      }

      // Check status contains notification when request returns error
      requestOptions?.errorNotification && checkStatus(response);
    } catch (error) {
      return Promise.reject(Object.assign({}, error, errorResponse));
    }
    return Promise.reject(errorResponse);
  },
};

const initHttp = () => {
  return new CAxios({
    // if the request has reached the timeout limit, it will display an alert
    timeout: 30000,
    baseURL:
      SATPAM_PROXY && process.env.NODE_ENV !== 'production'
        ? '/'
        : SATPAM_API_URL,
    prefixUrl: SATPAM_API_PREFIX,
    transform,
    requestOptions: {
      joinPrefix: true,
      errorNotification: true,
    },
  });
};

export default initHttp();
