const getters = {
  getRequestStatus: state => ({
    fetch: state.isFetching,
    error: state.onError,
  }),
  getItems: state => state.items,
  getPagination: state => state.pagination,
  getBankCoreRequestStatus: state => ({
    fetch: state.bankCore.isFetching,
    error: state.bankCore.onError,
  }),
  getBankCoreItems: state => state.bankCore.items,
  getCopyLpsRequestStatus: state => ({
    fetch: state.copyLps.isFetching,
    error: state.copyLps.onError,
  }),
  getCopyLpsItems: state => state.copyLps.items,
};

export default getters;
