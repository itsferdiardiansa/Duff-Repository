<template>
  <div class="container">
    <Card class="w-3/4">
      <div class="wrapper">
        <ContentHeader />

        <div class="mt-2">
          <ContentLIst />
        </div>
      </div>
    </Card>
  </div>
</template>
<script>
import Card from '@common/Card'
import ContentHeader from '@fragment/PivotBank/Header'
import ContentLIst from '@fragment/PivotBank/List'

export default {
  components: {
    Card,
    ContentHeader,
    ContentLIst,
  },
}
</script>
<style lang="scss" scoped>
.wrapper {
  @apply py-3 px-5;
}
</style>
