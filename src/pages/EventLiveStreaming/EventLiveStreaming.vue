<template>
  <div class="container">
    <div class="event-list mx-auto grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
      <EventLoader />
      
      <EventLiveStreamingList />
    </div>
  </div>
</template>
<script>
import EventLiveStreamingList from '@fragment/LiveStreaming/EventLiveStreaming/EventLiveStreamingList'
import EventLoader from '@fragment/LiveStreaming/EventLiveStreaming/EventLoader'

export default {
  components: {
    EventLiveStreamingList,
    EventLoader
  }  
}
</script>