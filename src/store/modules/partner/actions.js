import PartnerService from '@service/api/partner'

const actions = {
  async fetchData({ commit }) {
    commit('fetchStart')

    try {
      const response = await PartnerService.getList()
      const collections = await response.data
      
      commit('fetchSuccess', collections)
    } catch (error) { 
      commit('fetchFailed', error)
    }
  },
  async postData({ commit }, payload) {
    commit('fetchStart')

    try {
      const response = await PartnerService.create(payload.data)
      const collections = await response.data
    
      commit('fetchSuccess', {...payload, ...collections})
    } catch(error) {
      commit('fetchFailed', {
        ...payload, 
        status: 'failed', 
        message: 'Failed to create data', 
        error
      })
    }
  },
  async updateData({ commit }, payload) {
    commit('fetchStart')

    try {
      const response = await PartnerService.update(payload.data)
      const collections = await response.data
    
      commit('fetchSuccess', {...payload, ...collections})
    } catch(error) {
      commit('fetchFailed', {
        ...payload, 
        status: 'failed', 
        message: 'Failed to create data', 
        error
      })
    }
  },
  async deleteData({ commit, dispatch }, payload) {
    commit('fetchStart')
    
    try {
      const response = await PartnerService.delete(payload.hash_id)
      const collections = await response.data

      commit('fetchSuccess', {...payload, ...collections})
    } catch(error) {
      commit('fetchFailed', {
        ...payload, 
        status: 'failed', 
        message: 'Failed to delete data', 
        error
      })
    } finally {
      dispatch('fetchData')
    }
  }
}

export default actions
