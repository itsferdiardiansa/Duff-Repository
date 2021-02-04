<template>
  <div :class="`${prefixClass}-container`">
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
import ContentHeader from '@fragment/VerifiedUser/Header'
import ContentLIst from '@fragment/VerifiedUser/List'

export default {
  components: {
    Card,
    ContentHeader,
    ContentLIst,
  },
  setup() {

  }
}
</script>
<style lang="scss" scoped>
.wrapper {
  @apply py-3 px-5;
}
</style>
