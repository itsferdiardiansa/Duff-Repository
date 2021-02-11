<template>
  <div class="container">
    <Card>
      <div class="wrapper">
        <div class="mt-2">
          <List />
        </div>
      </div>
    </Card>
  </div>
</template>
<script>
import Card from '@common/Card'
import List from '@fragment/Footer/MenuList'

export default {
  components: {
    Card,
    List,
  },
}
</script>
<style lang="scss" scoped>
.wrapper {
  @apply py-3 px-5;
}
</style>
