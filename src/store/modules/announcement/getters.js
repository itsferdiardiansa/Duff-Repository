const getters = {
  getFetchStatus: state => state.isFetching,
  getAnnouncement: state => state.items,
  getPagination: state => state.pagination,
  getFetchError: state => state.onError,
}

export default getters
