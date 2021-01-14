const actions = {
  async fetchThematicPage({ commit }) {
    try {
      const response = await fetch(process.env.API_URL + '/thematicPage')
      const collections = await response.json()

      commit('fetchSuccess', collections)
    } catch (e) {
      console.error(e)
    }
  },
}

export default actions
