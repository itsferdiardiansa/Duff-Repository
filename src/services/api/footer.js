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
    console.log(params);
    return http.request({
      url: `/footer/${params.hash_id}/menu`,
      method: 'GET',
    });
  },
  createMenuList: params => {
    return http.request({
      url: `/footer/${params.hash_id}/menu`,
      method: 'POST',
      data: {
        params,
      },
    });
  },
  updateMenuList: params => {
    return http.request({
      url: `/footer/${params.footer_hash_id}/menu/${params.hash_id}`,
      method: 'DELETE',
      data: {
        params,
      },
    });
  },
};
