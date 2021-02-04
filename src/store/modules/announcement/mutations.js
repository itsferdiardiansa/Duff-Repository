const mutations = {
  fetchStart(state) {
    state.isFetching = true
    state.onError = false
  },
  fetchSuccess(state, payload) {
    const { items, ...otherData } = payload.result

    state.isFetching = false
    state.onError = false
    state.items = items
    state.pagination = otherData
  },
  fetchFailed(state) {
    state.isFetching = false
    state.onError = true
  },
}

export default mutations
