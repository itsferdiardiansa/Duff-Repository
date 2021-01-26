<template>
  <div class="container">
    <Card>
      <div class="wrapper">
        <ContentHeader />

        <div class="mt-2">
          <ContentList />
        </div>
      </div>
    </Card>
  </div>
</template>
<script>
import Card from '@common/Card'
import ContentHeader from '@fragment/Role/Header'
import ContentList from '@fragment/Role/List'

export default {
  components: {
    Card,
    ContentHeader,
    ContentList,
  },
}
</script>
<style lang="scss" scoped>
.wrapper {
  @apply py-3 px-5;
}
</style>
