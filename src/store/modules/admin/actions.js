import AdminService from '@service/api/admin';

const actions = {
  async fetchData({ commit }, payload) {
    commit('fetchStart');

    try {
      const response = await AdminService.getList(payload);
      const collections = await response.data;

      commit('fetchSuccess', collections);
    } catch (error) {
      commit('fetchFailed', { requestData: payload, responseData: error });
    }
  },
  async postData({ commit }, payload) {
    commit('fetchStart');

    try {
      const response = await AdminService.create(payload.data);
      const collections = await response.data;

      commit('fetchSuccess', { ...payload, ...collections });
    } catch (error) {
      commit('fetchFailed', { requestData: payload, responseData: error });
    }
  },
  async updateData({ commit }, payload) {
    commit('fetchStart');

    try {
      const response = await AdminService.update(payload.data);
      const collections = await response.data;

      commit('fetchSuccess', { ...payload, ...collections });
    } catch (error) {
      commit('fetchFailed', { requestData: payload, responseData: error });
    }
  },
  async deleteData({ commit, dispatch }, payload) {
    commit('fetchStart');

    try {
      const response = await AdminService.delete(payload.hash_id);
      const collections = await response.data;

      commit('fetchSuccess', { ...payload, ...collections });
    } catch (error) {
      commit('fetchFailed', { requestData: payload, responseData: error });
    } finally {
      dispatch('fetchData', payload.params);
    }
  },
};

export default actions;
