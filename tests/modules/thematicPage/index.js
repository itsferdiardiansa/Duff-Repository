import { createStore } from 'vuex'
import thematicPage from '@store/modules/thematicPage'
import mockStore from '@mock/collections'

let store

global.fetch = jest.fn(() =>
  Promise.resolve({ json: () => mockStore.thematicPage })
)

const createStoreConfig = () => ({
  modules: {
    thematicPage,
  },
})

beforeEach(() => {
  const storeConfig = createStoreConfig()

  store = createStore(storeConfig)
})

describe('thematicPage module', () => {
  it('fetch and return success', async () => {
    await store.dispatch('thematicPage/fetchThematicPage')

    expect(store.getters['thematicPage/getThematicPage']).toEqual(
      mockStore.thematicPage.result.data
    )
  })
})
