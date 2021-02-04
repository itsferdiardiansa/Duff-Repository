import RoleService from '@service/api/role'

const actions = {
  async fetchRole({ commit }) {
    commit('fetchStart')

    try {
      const response = await RoleService.getList()
      const collections = await response.data

      commit('fetchSuccess', collections)
    } catch (error) { 
      console.log(error)
    }
  },
}

export default actions
