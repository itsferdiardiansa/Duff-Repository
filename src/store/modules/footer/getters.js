const getters = {
  getRequestStatus: state => ({fetch: state.isFetching, error: state.onError}),
  getFooter: state => state.items,
}

export default getters