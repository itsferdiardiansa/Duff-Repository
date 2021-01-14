<template>
  <template v-if="!isFetching">
    <template v-for="(item, key) in filteredEvents" :key="key">
      <EventLiveStreamingItem :data="item" />
    </template>
  </template>
  <template v-else>
    <EventLoader />
  </template>
</template>
<script>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import EventLiveStreamingItem from './EventLiveStreamingItem'
import EventLoader from './EventLoader'

export default {
  components: {
    EventLiveStreamingItem,
    EventLoader
  },
  setup() {
    const store = useStore()

    const getEvents = () => {
      store.dispatch('eventLiveStreaming/fetchEvents')
    }

    const filteredEvents = computed(() => {
      return store.getters['eventLiveStreaming/getEvents']
    })

    const isFetching = computed(() => {
      return store.getters['eventLiveStreaming/getFetchStatus']
    })

    onMounted(getEvents)

    return {
      filteredEvents,
      isFetching
    }
  }
}
</script>
