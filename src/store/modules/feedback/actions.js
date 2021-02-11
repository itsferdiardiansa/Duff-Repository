/* eslint-disable */
import FeedbackService from '@service/api/feedback'

const actions = {
  async fetchData({ commit }) {
    commit('fetchStart')

    try {
      const response = await FeedbackService.getList()
      const collections = await response.data
      
      commit('fetchSuccess', collections)
    } catch (error) { 
      commit('fetchFailed', error)
    }
  },
  async markAsResponded({ commit, dispatch }, payload) {
    commit('fetchStart')

    try {
      const response = await FeedbackService.markAsResponded(payload.data)
      const collections = await response.data
    
      commit('fetchSuccess', {...payload, ...collections})

    } catch(error) {
      commit('fetchFailed', {
        ...payload, 
        status: 'failed', 
        message: 'Failed to mark as responded', 
        error
      })
    } finally {
      dispatch('fetchData')
    }
  },
  async markAsRead({ commit, dispatch }, payload) {
    commit('fetchStart')

    try {
      const response = await FeedbackService.markAsRead(payload.data)
      const collections = await response.data
    
      commit('fetchSuccess', {...payload, ...collections})

    } catch(error) {
      commit('fetchFailed', {
        ...payload, 
        status: 'failed', 
        message: 'Failed to mark as read', 
        error
      })
    } finally {
      dispatch('fetchData')
    }
  },
}

export default actions
