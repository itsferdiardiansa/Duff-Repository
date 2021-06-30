const mutations = {
  fetchStart(state) {
    state.isFetching = true;
    state.onError = false;
  },
  fetchSuccess(state, payload) {
    const { data, ...pagination } = payload?.responseData.result;
    state.isFetching = false;
    state.items = data;
    state.pagination = pagination;
  },
  fetchFailed(state, payload) {
    state.isFetching = false;
    state.onError = {
      status: true,
      body: { ...payload },
    };
  },
  fetchBankCoreStart(state) {
    state.bankCore.isFetching = true;
    state.bankCore.onError = false;
  },
  fetchBankCoreSuccess(state, payload) {
    const { data } = payload?.responseData.result;
    state.bankCore.isFetching = false;
    state.bankCore.items = data;
  },
  fetchBankCoreFailed(state, payload) {
    state.bankCore.isFetching = false;
    state.bankCore.onError = {
      status: true,
      body: { ...payload },
    };
  },
  fetchCopyLpsStart(state) {
    state.copyLps.isFetching = true;
    state.copyLps.onError = false;
  },
  fetchCopyLpsSuccess(state, payload) {
    const { data } = payload?.responseData.result;
    state.copyLps.isFetching = false;
    state.copyLps.items = data;
  },
  fetchCopyLpsFailed(state, payload) {
    state.copyLps.isFetching = false;
    state.copyLps.onError = {
      status: true,
      body: { ...payload },
    };
  },
};

export default mutations;
