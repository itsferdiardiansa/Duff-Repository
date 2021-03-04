const getters = {
  getRequestStatus: state => ({
    fetch: state.isFetching,
    error: state.onError,
  }),
  getItems: state => state.items,
  getFormData: state => state.form,
  getPagination: state => state.pagination,
};

export default getters;
