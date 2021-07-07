<template>
  <div :class="['app-logo', { mono: isCollapsed }]">
    <router-link to="/" class="app-logo--link">
      <img src="@asset/goplay-logo-white.svg" v-show="!isCollapsed" />
      <span v-show="isCollapsed"><strong>G</strong></span>
    </router-link>
  </div>
</template>
<script>
import { inject } from 'vue';
export default {
  setup() {
    const appContext = inject('appContext');

    return {
      isCollapsed: appContext.isCollapsed,
    };
  },
};
</script>
<style lang="scss" scoped>
.app-logo {
  @apply px-6 py-2 h-24 flex items-center;
  background-color: $bg-blue;

  &.mono {
    @apply py-4;

    span {
      @apply text-3xl;
    }
  }

  &--link {
    @apply h-10 text-xl text-white;

    img {
      @apply h-10;
    }
  }
}
</style>
