/* eslint-disable */
import UserService from '@service/api/user';

const actions = {
  async doLogin({ commit }, payload) {
    commit('loginStart');

    try {
      const response = await UserService.login(payload);
      const collections = await response.data;
      const {
        result: { token },
        message,
        user = payload.email,
      } = collections;

      commit('loginSuccess', { token, user });

      return true;
    } catch (error) {
      commit('loginFailed', { requestData: payload, responseData: error });
    }
  },
  doLogout({ commit }) {
    commit('removeAuth');
  },
};

export default actions;
