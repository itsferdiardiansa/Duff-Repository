const actions = {
  async fetchEvents({ commit }) {
    let headers = new Headers()

    commit('fetchStart')

    headers.append('pragma', 'no-cache')
    headers.append('cache-control', 'no-cache')

    try {
      const collections = await this.$http({
        url: process.env.API_URL + '/eventLiveStreaming',
        headers,
      })

      commit('fetchSuccess', collections)
    } catch (e) {
      commit('fetchFailed')
    }
  },
}

export default actions
