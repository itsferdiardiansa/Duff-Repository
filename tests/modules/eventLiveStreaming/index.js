import { createStore } from 'vuex'
import eventLiveStreaming from '@store/modules/eventLiveStreaming'
import mockStore from '@mock/collections'

let store

const httpPlugins = store => {
  store.$http = params => mockStore.eventLiveStreaming
}

const createStoreConfig = () => ({
  modules: {
    eventLiveStreaming,
  },
  plugins: [httpPlugins],
})

beforeEach(() => {
  const storeConfig = createStoreConfig()

  store = createStore(storeConfig)
})

describe('eventLiveStreaming module', () => {
  it('fetch and return success', async () => {
    await store.dispatch('eventLiveStreaming/fetchEvents')

    expect(store.getters['eventLiveStreaming/getEvents']).toEqual(
      mockStore.eventLiveStreaming.result.data
    )
  })
})
