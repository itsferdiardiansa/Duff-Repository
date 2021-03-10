/* eslint-disable */
import FeedbackService from '@service/api/feedback';

const actions = {
  async fetchData({ commit }, payload) {
    commit('fetchStart');

    try {
      const response = await FeedbackService.getList(payload);
      const collections = await response.data;

      commit('fetchSuccess', {
        requestData: payload,
        responseData: collections,
      });
    } catch (error) {
      commit('fetchFailed', { requestData: payload, responseData: error });
    }
  },
  async markAsResponded({ commit, dispatch }, payload) {
    commit('fetchStart');

    try {
      const response = await FeedbackService.markAsResponded(payload.data);
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
  async markAsRead({ commit, dispatch }, payload) {
    commit('fetchStart');

    try {
      const response = await FeedbackService.markAsRead(payload.data);
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
