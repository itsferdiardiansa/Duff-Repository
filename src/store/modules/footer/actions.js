import FooterService from '@service/api/footer'

const actions = {
  async fetchData({ commit }) {
    commit('fetchStart')

    try {
      const response = await FooterService.getList()
      const collections = await response.data
      
      commit('fetchSuccess', collections)
    } catch (error) { 
      commit('fetchFailed', error)
    }
  },
  async postData({ commit }, payload) {
    commit('fetchStart')

    try {
      const response = await FooterService.create(payload.data)
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
      const response = await FooterService.update(payload.data)
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
      const response = await FooterService.delete(payload)
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
  },
  async fetchMenuList({ commit }, payload) {
    commit('fetchStart')

    try {
      const response = await FooterService.menuList(payload)
      const collections = await response.data
      
      commit('fetchSuccess', collections)
    } catch (error) { 
      commit('fetchFailed', error)
    }
  },
}

export default actions
