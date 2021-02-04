import AnnouncementService from '@service/api/announcement'

const actions = {
  async fetchData({ commit }) {
    commit('fetchStart')
    
    try {
      const response = await AnnouncementService.getList()
      const collections = await response.data

      commit('fetchSuccess', collections)
    } catch(error) {
      console.error('ANNOUNCEMENT', error)
    }
  },
}

export default actions
