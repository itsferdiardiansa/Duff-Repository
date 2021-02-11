const getters = {
  getRequestStatus: state => ({fetch: state.isFetching, error: state.onError}),
  getItems: state => state.items,
}

export default getters