import FooterService from '@service/api/footer'

const actions = {
  async fetchData({ commit }) {
    commit('fetchStart')

    try {
      const response = await FooterService.getList()
      const collections = await response.data
      
      commit('fetchSuccess', collections)
    } catch (error) { 
      console.log(error)
      commit('fetchFailed', error)
    }
  },
}

export default actions
