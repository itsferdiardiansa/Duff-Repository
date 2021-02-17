import UserService from '@service/api/user';

const actions = {
  async doLogin({ commit }, payload) {
    commit('processLogin', true);

    try {
      const response = await UserService.login(payload);
      const collections = await response.data;
      const {
        result: { token },
        message,
        user = payload.email,
      } = collections;

      self.$alert.show({
        content: message,
        variant: 'success',
        timeout: 2000,
      });

      commit('setToken', { token, user });

      return true;
    } catch (error) {
      console.error(error);
    } finally {
      commit('processLogin', false);
    }
  },
};

export default actions;
