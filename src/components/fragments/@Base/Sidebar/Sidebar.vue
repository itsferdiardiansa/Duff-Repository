<template>
  <aside :class="['app-sidebar', { collapsed: isCollapsed }]">
    <AppLogo />

    <LayoutMenu>
      <CollapseToggle />
      <ListMenu :data="menus" />
    </LayoutMenu>
  </aside>
</template>
<script>
import { inject, ref } from 'vue';
import AppLogo from './AppLogo';
import CollapseToggle from './CollapseToggle';
import LayoutMenu from './Menu';
import ListMenu from './MenuList';
import MenuCollections from '@data/menu';

export default {
  components: {
    AppLogo,
    LayoutMenu,
    ListMenu,
    CollapseToggle,
  },
  setup() {
    const sidebarContext = inject('sidebarContext');
    let menus = ref(MenuCollections);

    return {
      isCollapsed: sidebarContext.isCollapsed,
      menus,
    };
  },
};
</script>
<style lang="scss" scoped>
.app-sidebar {
  @apply w-64 z-50 max-h-full relative;
  @apply md:fixed md:top-0 md:shadow-xl text-left;

  &.collapsed {
    @apply w-16;
  }
}
</style>
