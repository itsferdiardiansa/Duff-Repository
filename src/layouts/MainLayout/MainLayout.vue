<template>
  <Header />
  
  <SideBar />

  <main class="content bg-gray-100">
    <div class="page-header px-6 py-6 shadow-md bg-gray-50">
      <div class="container">
        <h3 class="text-2xl font-bold">Event Live Streaming</h3>
      </div>
    </div>
    
    <div class="p-6">
      <Breadcrumb :data="breadcrumbs" />
    </div>
    
    <div class="h-full flex flex-row flex-wrap px-6">
      <slot></slot>
    </div>
  </main>
</template>
<script>
import Breadcrumb from '@common/Breadcrumb'
import Header from '@fragment/Base/Header'
import SideBar from '@fragment/Base/Sidebar'

export default {
  components: {
    Header, 
    SideBar,
    Breadcrumb
  },
  data() {
    return {
      breadcrumbs: [
        {name: 'Home', link: '/'},
        {name: 'Event Live Streaming'}
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
.content {
  margin-left: 255px;
  margin-top: 64px;
  text-align: left;
}
</style>