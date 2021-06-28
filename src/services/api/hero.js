/* eslint-disable */
import http from '@service/http';

export default {
  getList: params => {
    return http.request({
      url: '/hero',
      params,
    });
  },
  create: params => {
    const formData = http.createFormData(params);

    return http.request({
      url: '/hero',
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: formData,
    });
  },
  update: params => {
    const formData = http.createFormData(params);

    return http.request({
      url: `/hero/${params.hash_id}`,
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: formData,
    });
  },
  delete: params => {
    return http.request({
      url: `/hero/${params}`,
      method: 'DELETE',
      data: {
        name,
      },
    });
  },
};
