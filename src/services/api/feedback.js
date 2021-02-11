import http from '@service/http'

export default {
  getList: params => {
    return http.request({
      url: '/feedback/',
      params
    })
  },
  markAsResponded: params => {
    return http.request({
      url: `/feedback/mark-as-responded/${params.hash_id}`,
      method: 'POST'
    })
  },
  markAsRead: params => {
    return http.request({
      url: `/feedback/mark-as-read/${params.hash_id}`,
      method: 'POST'
    })
  }
}