global.mockRouterPush = jest.fn();
global.mockRouterAddRoute = jest.fn();
global.mockRouterBeforeEach = jest.fn();
global.mockRouterAfterEach = jest.fn();
global.mockRouterOnError = jest.fn();

// useRoute
global.mockRoutePath = jest.fn();
global.mockRouteFullPath = jest.fn();

module.exports = {
  ...jest.requireActual('vue-router'),
  createWebHistory: jest.fn(),
  createRouter: jest.fn(),
  useRouter: () => ({
    push: mockRouterPush,
    addRoute: mockRouterAddRoute,
    beforeEach: mockRouterBeforeEach,
    afterEach: mockRouterAfterEach,
    onError: mockRouterOnError,
  }),

  useRoute: () => ({
    path: mockRoutePath,
  }),
};
