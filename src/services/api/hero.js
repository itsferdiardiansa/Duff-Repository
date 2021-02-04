import http from '@service/http'

export default {
  getList: params => {
    return http.request({
      url: '/hero/',
      params
    })
  },
  create: params => {
    return http.request({
      url: '/hero/',
      method: 'POST',
      data: params
    })
  },
  delete: params => {
    return http.request({
      url: `/hero/${params}`,
      method: 'DELETE',
      data: {
        name
      }
    })
  }
}