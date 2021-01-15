const actions = {
  async fetchEvents({ commit }) {
    let headers = new Headers()

    commit('fetchStart')

    headers.append('pragma', 'no-cache')
    headers.append('cache-control', 'no-cache')

    try {
      const collections = await this.$http({
        url: process.env.API_URL + '/eventLiveStreaming',
        timeout: 2000,
        headers,
      })

      commit('fetchSuccess', collections)
    } catch (e) {
      console.log(e)
      commit('fetchFailed')
    }
  },
}

export default actions
