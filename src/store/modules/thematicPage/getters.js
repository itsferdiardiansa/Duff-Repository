const getters = {
  getRequestStatus: state => ({
    fetch: state.isFetching,
    error: state.onError,
  }),
  getThematicPage: state => state.items,
  getPagination: state => state.pagination,
};

export default getters;
