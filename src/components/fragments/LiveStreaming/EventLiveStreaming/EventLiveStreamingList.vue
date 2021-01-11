<template>
  <template v-for="key in 5" :key="key">
    <EventLiveStreamingItem />
  </template>
</template>
<script>
import EventLiveStreamingItem from './EventLiveStreamingItem'

export default {
  components: {
    EventLiveStreamingItem
  }  
}
</script>
