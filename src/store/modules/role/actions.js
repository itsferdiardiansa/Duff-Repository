import RoleService from '@service/api/role'

const actions = {
  async fetchData({ commit }) {
    commit('fetchStart')

    try {
      const response = await RoleService.getList()
      const collections = await response.data
      
      commit('fetchSuccess', collections)
    } catch (error) { 
      console.log('error', error)

      commit('fetchFailed', error)
    }
  },
  async postData({ commit }, payload) {
    commit('fetchStart')

    try {
      const response = await RoleService.create(payload.data)
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
      const response = await RoleService.update(payload.data)
      const collections = await response.data
    
      commit('fetchSuccess', {...payload, ...collections})
    } catch(error) {
      commit('fetchFailed', {
        ...payload, 
        status: 'failed', 
        message: 'Failed to update data', 
        error
      })
    }
  },
  async deleteData({ commit, dispatch }, payload) {
    commit('fetchStart')
    
    try {
      const response = await RoleService.delete(payload.hash_id)
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
