global.mockStoreSubscribe = jest.fn();

jest.mock('vuex', () => ({
  ...jest.requireActual('vuex'),
}));
