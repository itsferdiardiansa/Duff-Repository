import http from '@service/http';

export default {
  getList: params => {
    return http.request({
      url: '/thematic',
      params,
    });
  },
  create: params => {
    const formData = http.createFormData(params);

    return http.request({
      url: '/thematic',
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
      url: `/thematic/${params.hash_id}`,
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: formData,
    });
  },
  delete: params => {
    return http.request({
      url: `/thematic/${params}`,
      method: 'DELETE',
      data: {
        name,
      },
    });
  },
  detail: params => {
    return http.request({
      url: `/thematic/${params.hash_id}`,
      method: 'GET',
      params: {
        params,
      },
    });
  },
  createEvent: params => {
    return http.request({
      url: `/thematic/${params.hash_id}/event`,
      method: 'POST',
      data: {
        params,
      },
    });
  },
  deleteEvent: params => {
    return http.request({
      url: `/thematic/${params.hash_id}`,
      method: 'DELETE',
      data: {
        params,
      },
    });
  },
};
