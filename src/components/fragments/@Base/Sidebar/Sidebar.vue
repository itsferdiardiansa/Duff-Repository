<template>
  <aside class="app-sidebar">
    <AppLogo />

    <LayoutMenu>
      <ListMenu :data="menus" />
    </LayoutMenu>
  </aside>
</template>
<script>
import { ref } from 'vue';
import AppLogo from './AppLogo';
import LayoutMenu from './Menu';
import ListMenu from './MenuList';
import MenuCollections from '@data/menu';

export default {
  components: {
    AppLogo,
    LayoutMenu,
    ListMenu,
  },
  setup() {
    let menus = ref(MenuCollections);

    return {
      menus,
    };
  },
};
</script>
<style lang="scss" scoped>
.app-sidebar {
  @apply w-64 z-50 max-h-full overflow-y-scroll;
  @apply md:fixed md:top-0 md:shadow-xl text-left;
}
</style>
