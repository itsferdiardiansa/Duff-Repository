/* eslint-disable */
import http from '@service/http';

export default {
  login: params => {
    return http.request({
      url: '/auth/login',
      method: 'POST',
      data: params,
    });
  },
};
