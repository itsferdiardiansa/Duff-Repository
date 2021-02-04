import http from '@service/http'

export default {
  getList: params => {
    return http.request({
      url: '/announcement',
      params
    })
  }
}