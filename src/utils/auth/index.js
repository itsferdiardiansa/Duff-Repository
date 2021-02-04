export default {
  getToken: () => {
    let accessToken = localStorage.getItem('access_token')

    if(accessToken)
      return accessToken
  }
}