const mutations = {
  fetchSuccess(state, payload) {
    state.items = payload.result.data
  },
}

export default mutations
