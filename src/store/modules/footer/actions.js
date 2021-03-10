import FooterService from '@service/api/footer';

const actions = {
  async fetchData({ commit }, payload) {
    commit('fetchStart');

    try {
      const response = await FooterService.getList(payload);
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
      const response = await FooterService.create(payload.data);
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
      const response = await FooterService.update(payload.data);
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
      const response = await FooterService.delete(payload.hash_id);
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
  async fetchMenuList({ commit }, payload) {
    commit('fetchStart');

    try {
      const response = await FooterService.menuList(payload);
      const collections = await response.data;

      commit('fetchSuccess', {
        requestData: payload,
        responseData: collections,
      });
    } catch (error) {
      commit('fetchFailed', { requestData: payload, responseData: error });
    }
  },
  async postMenuData({ commit }, payload) {
    const { hash_id, data } = payload;

    commit('fetchStart');

    try {
      const response = await FooterService.createMenu(hash_id, data);
      const collections = await response.data;

      commit('fetchSuccess', {
        requestData: payload,
        responseData: collections,
      });
    } catch (error) {
      commit('fetchFailed', { requestData: payload, responseData: error });
    }
  },
  async updateMenuData({ commit }, payload) {
    const { hash_id, data } = payload;

    commit('fetchStart');

    try {
      const response = await FooterService.updateMenu(hash_id, data);
      const collections = await response.data;

      commit('fetchSuccess', {
        requestData: payload,
        responseData: collections,
      });
    } catch (error) {
      commit('fetchFailed', { requestData: payload, responseData: error });
    }
  },
};

export default actions;
