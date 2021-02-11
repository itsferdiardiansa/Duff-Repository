import CAxios from './axios'
import errorCode from './vars/errorCode'

// a while until we finish working on the login page
const getToken = () => {
  return sessionStorage.getItem('access_token')
}

const transform = {
  preRequestHooks: (config, options) => {
    const { joinPrefix } = options

    if (joinPrefix) config.url = MP2_API_PREFIX + config.url

    return config
  },
  requestInterceptors: config => {
    const token = getToken()

    config.headers.Clientkey = MP2_API_KEY

    if (token) config.headers.Authorization = 'Bearer ' + token

    return config
  },
  requestIngterceptorsError: error => {
    let opr = error

    return opr
  },
  responseInterceptors: response => {
    return response
  },
  responseInterceptorsError: error => {
    const { response, code, message } = error || {}
    const err = error?.toString?.() ?? ''

    try {
      if (errorCode.includes(code) || Boolean(~message.indexOf('timeout'))) {
        self.$alert.show({
          variant: 'danger',
          content: '<b>Request timeout</b>',
        })
      }
      if (err?.includes('Network Error')) {
        self.$alert.show({
          variant: 'danger',
          content: '<b>Please check you internet connnection</b>',
        })
      }

      throw response
    } catch (error) {
      throw response
    }
  },
}

const initHttp = () => {
  return new CAxios({
    timeout: 10000,
    baseURL: MP2_PROXY ? '/' : MP2_API_URL,
    prefixUrl: MP2_API_PREFIX,
    transform,
    requestOptions: {
      joinPrefix: true,
    },
  })
}

export default initHttp()
