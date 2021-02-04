<template>
  <div class="container">
    <Card>
      <div class="wrapper">
        <div class="mt-2">
          <ContentLIst />
        </div>
      </div>
    </Card>
  </div>
</template>
<script>
import Card from '@common/Card'
import ContentLIst from '@fragment/Footer/List'

export default {
  components: {
    Card,
    ContentLIst,
  },
}
</script>
<style lang="scss" scoped>
.wrapper {
  @apply py-3 px-5;
}
</style>
