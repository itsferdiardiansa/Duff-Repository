import { createStore } from 'vuex'
import eventLiveStreaming from '@store/modules/eventLiveStreaming'
import mockStore from '@mock/collections'

let store

global.fetch = jest.fn(() => Promise.resolve(mockStore.eventLiveStreaming))

const createStoreConfig = () => ({
  modules: {
    eventLiveStreaming,
  },
})

beforeEach(() => {
  const storeConfig = createStoreConfig()

  store = createStore(storeConfig)
})

describe('eventLiveStreaming module', () => {
  it('fetch and return success', async () => {
    await store.dispatch('eventLiveStreaming/fetchEvents')

    console.log(mockStore.eventLiveStreaming.result)
    expect(store.getters['eventLiveStreaming/getEvents']).toEqual(
      mockStore.eventLiveStreaming.result.data
    )
  })
})
