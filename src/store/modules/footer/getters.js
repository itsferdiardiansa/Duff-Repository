const getters = {
  getRequestStatus: state => ({
    fetch: state.isFetching,
    error: state.onError,
  }),
  getItems: state => state.items,
  getPagination: state => state.pagination,
  getPosition: state => state.position,
  getPositionByID: state => id => state.position.find(item => item.value == id),
};

export default getters;
