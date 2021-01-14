const getters = {
  getFetchStatus: state => state.isFetching,
  getEvents: state => state.items,
}

export default getters
