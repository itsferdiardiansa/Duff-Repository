import NotificationService from '@service/api/notification';

const actions = {
  async fetchData({ commit }, payload) {
    commit('fetchStart');

    try {
      const response = await NotificationService.getList(payload);
      const collections = await response.data;

      commit('fetchSuccess', {
        requestData: payload,
        responseData: collections,
      });
    } catch (error) {
      commit('fetchFailed', { requestData: payload, responseData: error });
    }
  },
  async postData({ commit }, payload) {
    commit('fetchStart');

    try {
      const response = await NotificationService.create(payload.data);
      const collections = await response.data;

      commit('fetchSuccess', {
        requestData: payload,
        responseData: collections,
      });
    } catch (error) {
      commit('fetchFailed', { requestData: payload, responseData: error });
    }
  },
  async updateData({ commit }, payload) {
    commit('fetchStart');

    try {
      const response = await NotificationService.update(payload.data);
      const collections = await response.data;

      commit('fetchSuccess', {
        requestData: payload,
        responseData: collections,
      });
    } catch (error) {
      commit('fetchFailed', { requestData: payload, responseData: error });
    }
  },
  async deleteData({ commit, dispatch }, payload) {
    commit('fetchStart');

    try {
      const response = await NotificationService.delete('4343');
      const collections = await response.data;

      commit('fetchSuccess', {
        requestData: payload,
        responseData: collections,
      });
    } catch (error) {
      commit('fetchFailed', { requestData: payload, responseData: error });
    } finally {
      dispatch('fetchData', payload.params);
    }
  },
};

export default actions;
