import CAxios from './axios';
import errorCode from './vars/errorCode';
import TokenManager from '@util/token';
import router from '@route';

const transform = {
  preRequestHooks: (config, options) => {
    const { joinPrefix } = options;

    if (joinPrefix) config.url = MP2_API_PREFIX + config.url;

    return config;
  },
  requestInterceptors: config => {
    const token = TokenManager.getToken();

    config.headers.Clientkey = MP2_API_KEY;

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
        self.$alert.show({
          variant: 'danger',
          content: '<b>Request timeout</b>',
        });
      }

      if (message?.includes('Network Error')) {
        self.$alert.show({
          variant: 'danger',
          content: '<b>Please check you internet connnection</b>',
        });
      }

      if (response?.status === 403) {
        TokenManager.flush();
        setTimeout(() => {
          router.push({ name: 'Login' });
        }, 2000);
      }

      // throw error
    } catch (error) {
      throw new Error(error);
    }
    return Promise.reject(error);
  },
};

const initHttp = () => {
  return new CAxios({
    timeout: 10000,
    baseURL: MP2_PROXY ? '/' : MP2_API_URL,
    prefixUrl: MP2_API_PREFIX,
    transform,
    requestOptions: {
      joinPrefix: true,
    },
  });
};

export default initHttp();
