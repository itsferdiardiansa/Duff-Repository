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
};

export default mutations;
