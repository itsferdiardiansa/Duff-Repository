const getters = {
  getRequestStatus: state => ({fetch: state.isFetching, error: state.onError}),
  getPartner: state => state.items,
}

export default getters