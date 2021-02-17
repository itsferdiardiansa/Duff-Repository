<template>
  <Card class="content">
    <div class="content--wrapper">
      <div class="content--header">
        <slot name="header" />
      </div>

      <div class="content--main">
        <slot />
      </div>
    </div>
  </Card>
</template>
<script>
import Card from '@common/Card';

export default {
  components: {
    Card,
  },
};
</script>
<style lang="scss" scoped>
.content {
  @apply w-full;

  &--wrapper {
    @apply p-6;
  }

  &--main {
    @apply relative;
  }
}
</style>
