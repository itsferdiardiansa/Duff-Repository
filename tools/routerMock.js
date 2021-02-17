global.mockRouterPush = jest.fn();
global.mockRouterAddRoute = jest.fn();
global.mockRouterBeforeEach = jest.fn();
global.mockRouterAfterEach = jest.fn();
global.mockRouterOnError = jest.fn();

// useRoute
global.mockRoutePath = jest.fn();
global.mockRouteFullPath = jest.fn();

jest.mock('vue-router', () => ({
  useRouter: () => ({
    push: mockRouterPush,
    addRoute: mockRouterAddRoute,
    beforeEach: mockRouterBeforeEach,
    afterEach: mockRouterAfterEach,
    onError: mockRouterOnError,
  }),
  useRoute: () => ({
    path: mockRoutePath,
    // fullPath:
    // hash:
    // matched:
    // meta:
    // name:
    // params:
    // path:
    // query:
    // redirectedFrom:
  }),
  createWebHistory: jest.fn(),
  createRouter: jest.fn(),
}));
