<template>
  <MainLayout>
    <EventLiveStreamingPage />
  </MainLayout>
</template>
<script>
import MainLayout from '@layout/MainLayout'
import EventLiveStreamingPage from '@page/EventLiveStreaming'

export default {
  name: 'App',
  components: {
    MainLayout,
    EventLiveStreamingPage
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
