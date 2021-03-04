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
    const sidebarContext = inject('sidebarContext');

    return {
      isCollapsed: sidebarContext.isCollapsed,
    };
  },
};
</script>
<style lang="scss" scoped>
.app-container {
  &.menu-collapse {
    .app-content {
      margin-left: $pageContentCollapsedPaddingLeft;
    }
  }
}
</style>
