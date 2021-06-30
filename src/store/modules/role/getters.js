const getters = {
  getRequestStatus: state => ({
    fetch: state.isFetching,
    error: state.onError,
  }),
  getItems: state => state.items,
  getItemById: state => id => state.items.find(item => item.id === id),
  getFormData: state => state.form,
  getPagination: state => state.pagination,
  getPrivilegesItems: state => state.privileges.items,
  getPrivilegesRequestStatus: state => ({
    fetch: state.privileges.isFetching,
    error: state.privileges.onError,
  }),
};

export default getters;
