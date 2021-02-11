<template>
  <div class="container">
    <Card>
      <div class="wrapper">
        <div class="mt-2">
          <ContentList />
        </div>
      </div>
    </Card>
  </div>
</template>
<script>
import Card from '@common/Card'
import ContentList from '@fragment/Footer/List'

export default {
  components: {
    Card,
    ContentList,
  },
}
</script>
<style lang="scss" scoped>
.wrapper {
  @apply py-3 px-5;
}
</style>
