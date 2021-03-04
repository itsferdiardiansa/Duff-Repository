<template>
  <div class="collapse-toggle" @click="handleCollapse">
    <div class="collapse-toggle--wrapper">
      <font-awesome-icon :icon="['fa', 'bars']" />
    </div>
  </div>
</template>
<script>
import { inject } from 'vue';
export default {
  setup() {
    const sidebarContext = inject('sidebarContext');

    const handleCollapse = () => {
      sidebarContext.toggleCollapseSidebar();
    };

    return {
      handleCollapse,
    };
  },
};
</script>
<style lang="scss" scoped>
.collapse-toggle {
  @apply w-10 absolute top-2.5 hover:bg-indigo-900 rounded-full overflow-hidden cursor-pointer;
  right: -50px;

  &--wrapper {
    @apply p-2.5;

    svg {
      @apply text-gray-200;
    }
  }
}
</style>
