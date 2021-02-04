import ThematicPage from '@service/api/thematicPage'

const actions = {
  async fetchData({ commit }) {
    commit('fetchStart')

    try {
      const response = await ThematicPage.getList()
      const collections = await response.data
      
      commit('fetchSuccess', collections)
    } catch (error) { 
      commit('fetchFailed', error)
    }
  },
  async postData({ commit }, params) {
    commit('fetchStart')

    try {
      const response = await ThematicPage.create(params)
      const collections = await response.data

      console.log(collections)
    } catch(error) {
      commit('fetchFailed', error)
    }
  },
  async deleteData({ commit, dispatch }, params) {
    commit('fetchStart')
    
    try {
      const response = await ThematicPage.delete(params)
      
      await response.data

      dispatch('fetchData')
    } catch(error) {
      commit('fetchFailed', error)
    }
  }
}

export default actions
