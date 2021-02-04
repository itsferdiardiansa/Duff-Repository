<template>
  <div class="menu">
    <slot></slot>
  </div>
</template>
<style lang="scss" scoped>
.menu {
  @apply flex flex-col w-full overflow-y-scroll;
  height: calc(100vh - 64px);
}
</style>