const getters = {
  getRequestStatus: state => ({fetch: state.isFetching, error: state.onError}),
  getThematicPage: state => state.items,
}

export default getters