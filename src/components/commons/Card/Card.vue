<template>
  <div class="card">
    <slot></slot>
  </div>
</template>
<style lang="scss" scoped>
.card {
  @apply rounded-lg overflow-hidden flex flex-col;
  flex: 0 1 24%;

  .organizer {
    &::before {
      content: '';
      padding-top: 15px;
      display: flex;
      align-items: center;
      border-top: 1px dashed #e5e5e5;
    }
  }
}
</style>