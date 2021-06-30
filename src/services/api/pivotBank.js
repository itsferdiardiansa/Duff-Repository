import http from '@service/http';

export default {
  getList: params => {
    return http.request({
      url: '/bank',
      params,
    });
  },
  create: params => {
    return http.request({
      url: '/bank',
      method: 'POST',
      data: params,
    });
  },
  update: params => {
    return http.request({
      url: `/bank/${params.hash_id}`,
      method: 'POST',
      data: params,
    });
  },
  delete: params => {
    return http.request({
      url: `/bank/${params}`,
      method: 'DELETE',
      data: {
        name,
      },
    });
  },
  getBankCoreList: () => {
    return http.request(
      {
        url: '/bank/list-bank-core',
      },
      {
        errorNotification: false,
      }
    );
  },
  getCopyLpsList: () => {
    return http.request(
      {
        url: '/bank/list-bank-lps',
      },
      {
        errorNotification: false,
      }
    );
  },
};
