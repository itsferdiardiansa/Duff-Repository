<template>
  <div class="app-logo">
    <router-link to="/" class="app-logo--link">
      <span> Loket<strong class="font-black">CMS</strong> </span>
    </router-link>
  </div>
</template>
<style lang="scss" scoped>
.app-logo {
  @apply px-6 py-5 h-16 bg-gray-100;

  &--link {
    @apply text-xl text-gray-500;
  }
}
</style>
