const getters = {
  getRequestStatus: state => ({
    fetch: state.isFetching,
    error: state.onError,
  }),
  getItems: state => state.items,
  getFormData: state => state.form,
  getPagination: state => state.pagination,
  getPrivilegesItems: state => state.privileges.items,
  getPrivilegesRequestStatus: state => ({
    fetch: state.privileges.isFetching,
    error: state.privileges.onError,
  }),
};

export default getters;
