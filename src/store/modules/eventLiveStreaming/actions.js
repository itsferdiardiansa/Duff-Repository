const actions = {
  async fetchEvents({ commit }) {
    let headers = new Headers()

    commit('fetchStart')

    headers.append('pragma', 'no-cache')
    headers.append('cache-control', 'no-cache')

    try {
      let headers = new Headers()
      const response = await fetch(
        process.env.API_URL + '/eventLiveStreaming',
        { headers }
      )
      const collections = await response.json()

      commit('fetchSuccess', collections)
    } catch (e) {
      console.error(e)
    }
  },
}

export default actions
