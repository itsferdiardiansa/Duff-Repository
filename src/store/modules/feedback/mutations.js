const mutations = {
  fetchStart(state) {
    state.isFetching = true
    state.onError = false
  },
  fetchSuccess(state, payload) {
    state.isFetching = false
    state.onError = false
    state.items = payload?.result?.data
  },
  fetchFailed(state, payload) {
    state.isFetching = false
    state.onError = {
      status: true,
      data: payload
    }
  },
}

export default mutations
