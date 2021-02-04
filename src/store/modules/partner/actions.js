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
}

export default actions
