import http from '@service/http';

export default {
  getList: params => {
    return http.request({
      url: '/admin/',
      params,
    });
  },
  create: params => {
    return http.request({
      url: '/admin/',
      method: 'POST',
      data: params,
    });
  },
  update: params => {
    return http.request({
      url: `/admin/${params.hash_id}`,
      method: 'POST',
      data: params,
    });
  },
  delete: params => {
    return http.request({
      url: `/admin/${params}`,
      method: 'DELETE',
      data: {
        name,
      },
    });
  },
};
