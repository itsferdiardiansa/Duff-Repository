import AdminService from '@service/api/admin'

const actions = {
  async fetchData({ commit }) {
    commit('fetchStart')

    try {
      const response = await AdminService.getList()
      const collections = await response.data
      
      commit('fetchSuccess', collections)
    } catch (error) { 
      console.log(error)
    }
  },
}

export default actions
