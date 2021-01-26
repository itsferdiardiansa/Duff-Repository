<template>
  <div class="container">
    <Card>
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
import ContentHeader from '@fragment/Partner/Header'
import ContentLIst from '@fragment/Partner/List'

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
