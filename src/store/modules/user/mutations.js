import TokenManager from '@util/token';

export default {
  processLogin(state, payload) {
    state.processLogin = payload;
  },
  loginStart(state) {
    state.login = {
      isFetching: true,
      onError: {
        status: false,
        body: {},
      },
    };
  },
  loginSuccess(state, payload) {
    state.token = payload.token;
    state.user = payload.user;
    state.login.isFetching = false;

    TokenManager.setToken(payload);
  },
  loginFailed(state, payload) {
    state.login = {
      isFetching: false,
      onError: {
        status: true,
        body: { ...payload },
      },
    };
    console.log(state, TokenManager.getToken());
  },
  removeAuth(state) {
    state.user = null;
    state.token = null;

    TokenManager.flush();
  },
  setToken(state, payload) {
    TokenManager.setToken(payload);
  },
};
