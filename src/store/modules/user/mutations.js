import TokenManager from '@util/token';

export default {
  processLogin(state, payload) {
    state.processLogin = payload;
  },
  setToken(state, payload) {
    state.token = payload;

    TokenManager.setToken(payload);
  },
};
