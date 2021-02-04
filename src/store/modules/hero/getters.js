const getters = {
  getRequestStatus: state => ({fetch: state.isFetching, error: state.onError}),
  getHero: state => state.items,
}

export default getters