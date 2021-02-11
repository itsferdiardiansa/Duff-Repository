import ThematicPageService from '@service/api/thematicPage'

const actions = {
  async fetchData({ commit }) {
    commit('fetchStart')

    try {
      const response = await ThematicPageService.getList()
      const collections = await response.data
      
      commit('fetchSuccess', collections)
    } catch (error) { 
      commit('fetchFailed', error)
    }
  },
  async postData({ commit }, payload) {
    commit('fetchStart')

    try {
      const response = await ThematicPageService.create(payload.data)
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
      const response = await ThematicPageService.update(payload.data)
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
      const response = await ThematicPageService.delete(payload)
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
