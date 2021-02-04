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
  delete: params => {
    return http.request({
      url: `/thematic-page/${params}`,
      method: 'DELETE',
      data: {
        name
      }
    })
  }
}