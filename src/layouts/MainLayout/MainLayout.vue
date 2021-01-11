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
      <ul class="breadcrumb">
        <li class="breadcrumb-item"><a href="javascript:void(0);">Home</a></li>
        <li class="breadcrumb-item active">Event Live Streaming</li>
      </ul>
    </div>

    <div class="h-full flex flex-row flex-wrap px-6">
      <slot></slot>
    </div>
  </main>
</template>
<script>
import Header from '@fragment/Base/Header'
import SideBar from '@fragment/Base/Sidebar'

export default {
  components: {
    Header, 
    SideBar
  }
}
</script>
<style lang="scss" scoped>
.content {
  margin-left: 255px;
  margin-top: 64px;
  text-align: left;

  .breadcrumb {
    @apply flex;

    &-item {
      color: #e86b32;

      &.active {
        color: #aaaaaa;
      }

      &:first-child {
        &::before {
          display: none;
        }
      }

      &:before {
        content: "/";
        display: inline-block;
        padding-right: .5rem;
        padding-left: .5rem;
        color: #6c757d;
      }
    }
  }
}
</style>