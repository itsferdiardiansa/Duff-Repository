import TokenManager from '@util/token';

export default {
  processLogin: false,
  token: null,
  user: TokenManager.getUser(),
  login: {
    isFetching: false,
    onError: {
      status: false,
      body: {},
    },
  },
};
