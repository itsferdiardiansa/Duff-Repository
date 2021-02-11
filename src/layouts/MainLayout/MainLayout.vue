<template>
  <div class="app-container">
    <LayoutHeader />
    <LayoutSideBar />
    <LayoutContent />
  </div>
</template>
<script>
/* eslint-disable vue/no-unused-components */
/* eslint-disable no-unused-vars */
import LayoutHeader from '@base/Header'
import LayoutSideBar from '@base/Sidebar'
import LayoutContent from '@base/Content'

export default {
  components: {
    LayoutHeader,
    LayoutSideBar,
    LayoutContent,
  },
}
</script>
