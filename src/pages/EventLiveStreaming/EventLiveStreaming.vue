<template>
  <div class="container">
    <div class="pb-6">
      <form class="flex flex-wrap" action="javascript:void(0)">
        <div class="w-4/5">
          <TextField 
            placeholder="Search Event Online By Title"
            size="large"
            class="search-input"
          />
        </div>

        <div class="ml-9">
          <Button 
            label="Register New Event"
          />
        </div>
      </form>
  </div>

    <div class="event-list mx-auto grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
      <EventLoader />
      
      <EventLiveStreamingList />
    </div>
  </div>
</template>
<script>
import TextField from '@common/TextField'
import Button from '@common/Button'
import EventLiveStreamingList from '@fragment/LiveStreaming/EventLiveStreaming/EventLiveStreamingList'
import EventLoader from '@fragment/LiveStreaming/EventLiveStreaming/EventLoader'

export default {
  components: {
    TextField,
    Button, 
    EventLiveStreamingList,
    EventLoader
  }  
}
</script>