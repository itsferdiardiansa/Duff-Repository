const mutations = {
  fetchStart(state) {
    state.isFetching = true
  },
  fetchSuccess(state, payload) {
    state.items = payload.result.data

    state.isFetching = false
  },
}

export default mutations
