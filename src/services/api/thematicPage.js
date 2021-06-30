/* eslint-disable */
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
  getEventList: ({ thematicHashId, ...otherParams }) => {
    return http.request({
      url: `/thematic/event/${thematicHashId}`,
      method: 'GET',
      params: {
        ...otherParams,
      },
    });
  },
  createEvent: ({ thematicHashId, data }) => {
    return http.request({
      url: `/thematic/event/${thematicHashId}`,
      method: 'POST',
      data,
    });
  },
  updateEvent: ({ thematicHashId, eventHashId, data }) => {
    return http.request({
      url: `/thematic/event/${thematicHashId}/${eventHashId}`,
      method: 'POST',
      data,
    });
  },
  deleteEvent: ({ thematicHashId, eventHashId }) => {
    return http.request({
      url: `/thematic/event/${thematicHashId}/${eventHashId}`,
      method: 'DELETE',
    });
  },
};
