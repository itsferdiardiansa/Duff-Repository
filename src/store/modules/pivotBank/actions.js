import PivotBankService from '@service/api/pivotBank';

const actions = {
  async fetchData({ commit }, payload) {
    commit('fetchStart');

    try {
      const response = await PivotBankService.getList(payload);
      const collections = await response.data;

      commit('fetchSuccess', {
        requestData: payload,
        responseData: collections,
      });
    } catch (error) {
      commit('fetchFailed', { requestData: payload, responseData: error });
    }
  },
  async fetchBankCore({ commit }, payload) {
    commit('fetchBankCoreStart');

    try {
      const response = await PivotBankService.getBankCoreList(payload);
      const collections = await response.data;

      commit('fetchBankCoreSuccess', {
        requestData: payload,
        responseData: collections,
      });
    } catch (error) {
      commit('fetchBankCoreFailed', {
        requestData: payload,
        responseData: error,
      });
    }
  },
  async fetchCopyLps({ commit }, payload) {
    commit('fetchCopyLpsStart');

    try {
      const response = await PivotBankService.getCopyLpsList(payload);
      const collections = await response.data;

      commit('fetchCopyLpsSuccess', {
        requestData: payload,
        responseData: collections,
      });
    } catch (error) {
      commit('fetchCopyLpsFailed', {
        requestData: payload,
        responseData: error,
      });
    }
  },
  async postData({ commit }, payload) {
    commit('fetchStart');

    try {
      const response = await PivotBankService.create(payload.data);
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
      const response = await PivotBankService.update(payload.data);
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
      const response = await PivotBankService.delete(payload.hash_id);
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
