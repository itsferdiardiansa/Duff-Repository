const mutations = {
  fetchStart(state) {
    state.isFetching = true;
    state.onError = false;
  },
  fetchSuccess(state, payload) {
    let { data, ...pagination } = payload?.responseData.result;

    // feel strange with the behavior of vuex
    if (typeof data === 'object' && data !== undefined)
      data = data?.map(item => ({
        ...item,
        privileges: JSON.stringify(item.privileges),
      }));

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
  fetchPrivilegesStart(state) {
    state.privileges = {
      ...state.privileges,
      isFetching: true,
      onError: {
        status: false,
        body: {},
      },
    };
  },
  fetchPrivilegesSuccess(state, payload) {
    state.privileges = {
      ...state.privileges,
      isFetching: false,
      items: payload?.responseData.result,
    };
  },
  fetchPrivilegesFailed(state, payload) {
    state.privileges = {
      ...state.privileges,
      isFetching: false,
      onError: {
        status: true,
        body: { ...payload },
      },
    };
  },
};

export default mutations;
