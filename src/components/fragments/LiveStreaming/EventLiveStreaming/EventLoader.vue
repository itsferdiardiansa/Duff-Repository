<template>
  <template v-for="key in count" :key="key">
    <Card class="card-loader">
      <RectSkeleton height="120px" :rounded="false" />

      <div class="p-2">
        <div class="flex flex-col">
          <RectSkeleton width="90%" height="12px" />
          <RectSkeleton width="40%" height="12px" class="mt-2" />
          <RectSkeleton width="70%" height="12px" class="mt-2" />
        </div>
      </div>
    </Card>
  </template>
</template>
<script>
import Card from '@common/Card'
import { Rect as RectSkeleton} from '@common/Skeleton'

export default {
  props: {
    count: {
      type: Number,
      default: 5
    }
  },
  components: {
    Card,
    RectSkeleton
  }  
}
</script>
<style lang="scss" scoped>
.card-loader {
  @apply overflow-hidden text-left bg-gray-50;
}
</style>