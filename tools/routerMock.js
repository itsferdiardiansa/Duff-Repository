global.mockRouterPush = jest.fn()

jest.mock('vue-router', () => ({
  useRouter: () => ({
    push: mockRouterPush,
  }),
}))
