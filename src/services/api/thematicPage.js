import http from '@service/http'

export default {
  getList: params => {
    return http.request({
      url: '/thematic-page/',
      params
    })
  },
  create: params => {
    return http.request({
      url: '/thematic-page/',
      method: 'POST',
      data: params
    })
  },
  update: params => {
    return http.request({
      url: `/thematic-page/${params.hash_id}`,
      method: 'POST',
      data: params
    })
  },
  delete: params => {
    return http.request({
      url: `/thematic-page/${params.hash_id}`,
      method: 'DELETE',
      data: {
        name
      }
    })
  },
  detail: params => {
    return http.request({
      url: `/thematic-page/${params.hash_id}`,
      method: 'GET',
      params: {
        params
      }
    })
  },
  createEvent: params => {
    return http.request({
      url: `/thematic-page/${params.hash_id}/event`,
      method: 'POST',
      data: {
        params
      }
    }) 
  },
  deleteEvent: params => {
    return http.request({
      url: `/thematic-page/${params.hash_id}`,
      method: 'DELETE',
      data: {
        params
      }
    })
  }
}