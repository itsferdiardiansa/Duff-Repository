<template>
  <div :class="['app-container', { 'menu-collapse': isCollapsed }]">
    <LayoutHeader />
    <LayoutSideBar />
    <LayoutContent />
  </div>
</template>
<script>
import { inject } from 'vue';
import LayoutHeader from '@base/Header';
import LayoutSideBar from '@base/Sidebar';
import LayoutContent from '@base/Content';

export default {
  components: {
    LayoutHeader,
    LayoutSideBar,
    LayoutContent,
  },
  setup() {
    const appContext = inject('appContext');

    return {
      isCollapsed: appContext.isCollapsed,
    };
  },
};
</script>
<style lang="scss" scoped>
.app-container {
  &.menu-collapse {
    .app-header {
      @apply pl-16;
    }
    .app-content {
      margin-left: $pageContentCollapsedPaddingLeft;
    }
  }
}
</style>
