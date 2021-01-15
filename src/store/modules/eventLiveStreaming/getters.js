const getters = {
  getFetchStatus: state => state.isFetching,
  getEvents: state => state.items,
  getFetchError: state => state.onError,
}

export default getters
