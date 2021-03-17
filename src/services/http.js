import CAxios from './axios';
import errorCode from './vars/errorCode';
import TokenManager from '@util/token';
import router from '@route';

const transform = {
  preRequestHooks: (config, options) => {
    const { joinPrefix } = options;

    if (joinPrefix) config.url = SATPAM_API_PREFIX + config.url;

    return Object.assign(config, options);
  },
  requestInterceptors: config => {
    const token = TokenManager.getToken();

    config.headers.Clientkey = SATPAM_API_KEY;

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
  responseInterceptorsError: error => {
    const { response, code, message } = error || {};

    try {
      if (errorCode.includes(code) || Boolean(~message.indexOf('timeout'))) {
        sAlert.show({
          variant: 'danger',
          content: 'Request timeout',
        });
      }

      if (message?.includes('Network Error')) {
        sAlert.show({
          variant: 'danger',
          content: 'Please check you internet connnection',
        });
      }

      if ([403, 404].includes(response?.status)) {
        TokenManager.flush();

        sAlert.show({
          variant: 'danger',
          content: 'Session expired',
        });

        setTimeout(() => {
          router.push({ name: 'Login' });
        }, 2000);
      }

      if ([500].includes(response?.status)) {
        sAlert.show({
          variant: 'danger',
          content: 'Internal server error',
        });
      }
    } catch (error) {
      throw new Error(error);
    }
    return Promise.reject(error);
  },
};

const initHttp = () => {
  return new CAxios({
    timeout: 10000,
    baseURL:
      SATPAM_PROXY && process.env.NODE_ENV !== 'production'
        ? '/'
        : SATPAM_API_URL,
    prefixUrl: SATPAM_API_PREFIX,
    transform,
    requestOptions: {
      joinPrefix: true,
    },
  });
};

export default initHttp();
