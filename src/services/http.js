import CAxios from './axios'
import errorCode from './vars/errorCode'

const {
  MP2_API_URL,
  MP2_API_PREFIX,
  MP2_API_KEY
} = process.env

// const errorCode = [
//   'ECONNABORTED'
// ]

// a while until we finish working on the login page
function getToken() {
  return sessionStorage.getItem('access_token')
}

const transform = {
  preRequestHooks: (config, options) => {
    const { joinPrefix } = options

    if(joinPrefix) 
      config.url = MP2_API_PREFIX + config.url

    return config
  },
  requestInterceptors: config => {
    const token = getToken()

    config.headers.Clientkey = MP2_API_KEY
    
    if(token)
      config.headers.Authorization = 'Bearer ' + token

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
      if (errorCode.includes(code) && message.indexOf('timeout') !== -1) {
        self.$alert.show({
          variant: 'danger',
          content: 'Request timeout',
        });
      }
      if (err?.includes('Network Error')) {
        self.$alert.show({
          variant: 'danger',
          content: 'Network error',
        });
      }
    } catch (error) {
      throw new Error(response)
    }

    return Promise.reject(response)
  }
}

const initHttp = () => {
  return new CAxios({
    timeout: 30000,
    baseURL: MP2_API_URL,
    prefixUrl: MP2_API_PREFIX,
    transform,
    requestOptions: {
      joinPrefix: true
    }
  })
}

export default initHttp()