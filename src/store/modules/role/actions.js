import RoleService from '@service/api/role';

const actions = {
  async fetchData({ commit }, payload) {
    commit('fetchStart');

    try {
      const response = await RoleService.getList(payload);
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
      const response = await RoleService.create(payload.data);
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
      const response = await RoleService.update(payload.data);
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
      const response = await RoleService.delete(payload.hash_id);
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
  async fetchPrivileges({ commit }, payload) {
    commit('fetchPrivilegesStart');

    try {
      const response = await RoleService.getPrivileges();
      const collections = await response.data;

      commit('fetchPrivilegesSuccess', {
        requestData: payload,
        responseData: collections,
      });
    } catch (error) {
      commit('fetchPrivilegesFailed', { requestData: {}, responseData: error });
    }
  },
};

export default actions;
