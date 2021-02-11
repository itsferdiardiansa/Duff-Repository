import http from '@service/http'

export default {
  getList: params => {
    return http.request({
      url: '/role/',
      params
    })
  },
  create: params => {
    return http.request({
      url: '/role/',
      method: 'POST',
      data: params
    })
  },
  update: params => {
    return http.request({
      url: `/role/${params.hash_id}`,
      method: 'POST',
      data: params
    })
  },
  delete: params => {
    return http.request({
      url: `/role/${params}`,
      method: 'DELETE',
      data: {
        name
      }
    })
  }
}