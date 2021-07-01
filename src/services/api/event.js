/* eslint-disable */
import http from '@service/http';

export default {
  getList: event_name => {
    return http.request(
      {
        url: '/event',
        params: {
          event_name,
        },
      },
      {
        errorNotification: false,
        timeout: 60000,
      }
    );
  },
};
