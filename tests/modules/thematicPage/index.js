import { createStore } from 'vuex'
import thematicPage from '@store/modules/thematicPage'
import mockStore from '@mock/collections'

let store

const httpPlugins = store => {
  store.$http = params => mockStore.thematicPage
}

const createStoreConfig = () => ({
  modules: {
    thematicPage,
  },
  plugins: [httpPlugins],
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
