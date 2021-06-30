const getters = {
  getRequestStatus: state => ({
    fetch: state.isFetching,
    error: state.onError,
  }),
  getItems: state => state.items,
  getPagination: state => state.pagination,
  getPosition: state => state.position,
};

export default getters;
