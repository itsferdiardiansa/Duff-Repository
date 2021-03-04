<template>
  <div :class="['app-logo', { mono: isCollapsed }]">
    <router-link to="/" class="app-logo--link">
      <template v-if="!isCollapsed">
        <span> Loket<strong class="font-black">CMS</strong> </span>
      </template>
      <template v-else>
        <span><strong>L</strong></span>
      </template>
    </router-link>
  </div>
</template>
<script>
import { inject } from 'vue';
export default {
  setup() {
    const sidebarContext = inject('sidebarContext');

    return {
      isCollapsed: sidebarContext.isCollapsed,
    };
  },
};
</script>
<style lang="scss" scoped>
.app-logo {
  @apply px-6 py-5 h-16 bg-gray-100;

  &.mono {
    @apply py-4;
    span {
      @apply text-3xl;
    }
  }

  &--link {
    @apply text-xl text-gray-500;
  }
}
</style>
