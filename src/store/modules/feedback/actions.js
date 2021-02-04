import FeedbackService from '@service/api/feedback'

const actions = {
  async fetchData({ commit }) {
    commit('fetchStart')

    try {
      const response = await FeedbackService.getList()
      const collections = await response.data
      
      commit('fetchSuccess', collections)
    } catch (error) { 
      console.log(error)
    }
  },
}

export default actions
