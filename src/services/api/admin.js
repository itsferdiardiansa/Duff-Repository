import http from '@service/http';

export default {
  getList: params => {
    return http.request({
      url: '/administrator/',
      params,
    });
  },
  create: params => {
    return http.request({
      url: '/administrator/',
      method: 'POST',
      data: params,
    });
  },
  update: params => {
    return http.request({
      url: `/administrator/${params.hash_id}`,
      method: 'POST',
      data: params,
    });
  },
  delete: params => {
    return http.request({
      url: `/administrator/${params}`,
      method: 'DELETE',
      data: {
        name,
      },
    });
  },
};
