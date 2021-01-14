<template>
  <div class="container">
    <div class="thematic-page">
      <ThematicList />
    </div>
  </div>
</template>
<script>
import ThematicList from '@fragment/Thematic/ThematicList'

export default {
  components: {
    ThematicList
  }  
}
</script>
<style lang="scss" scoped>
.thematic-page {
  @apply mx-auto;
}
</style>