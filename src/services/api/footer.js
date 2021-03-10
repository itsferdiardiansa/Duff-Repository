import http from '@service/http';

export default {
  getList: params => {
    return http.request({
      url: '/footer/',
      params,
    });
  },
  create: params => {
    return http.request({
      url: '/footer/',
      method: 'POST',
      data: params,
    });
  },
  update: params => {
    return http.request({
      url: `/footer/${params.hash_id}`,
      method: 'POST',
      data: params,
    });
  },
  delete: params => {
    return http.request({
      url: `/footer/${params}`,
      method: 'DELETE',
      data: {
        name,
      },
    });
  },
  menuList: params => {
    return http.request({
      url: `/footer/${params.hash_id}/menu`,
      method: 'GET',
      params: params.pagination,
    });
  },
  createMenu: (hash_id, data) => {
    return http.request({
      url: `/footer/${hash_id}/menu`,
      method: 'POST',
      data,
    });
  },
  updateMenu: (hash_id, data) => {
    return http.request({
      url: `/footer/${hash_id}/menu/${data.hash_id}`,
      method: 'POST',
      data,
    });
  },
};
