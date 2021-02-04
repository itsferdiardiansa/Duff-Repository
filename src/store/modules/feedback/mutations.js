const mutations = {
  fetchStart(state) {
    state.isFetching = true
    state.onError = false
  },
  fetchSuccess(state, payload) {
    state.isFetching = false
    state.onError = false
    state.items = payload.result.data
  },
  fetchFailed(state) {
    state.isFetching = false
    state.onError = true
  },
}

export default mutations
