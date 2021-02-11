import http from '@service/http'

export default {
  getList: params => {
    return http.request({
      url: '/notification/',
      params
    })
  },
  create: params => {
    return http.request({
      url: '/notification/',
      method: 'POST',
      data: params
    })
  },
  update: params => {
    return http.request({
      url: `/notification/${params.hash_id}`,
      method: 'POST',
      data: params
    })
  },
  delete: params => {
    return http.request({
      url: `/notification/${params}`,
      method: 'DELETE',
      data: {
        name
      }
    })
  }
}