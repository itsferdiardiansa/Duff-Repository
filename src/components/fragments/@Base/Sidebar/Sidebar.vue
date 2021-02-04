<template>
  <aside class="sidebar animated faster">
    <AppLogo />

    <Menu>
      <MenuList :data="menus" />
    </Menu>
  </aside>
</template>
<script>
import { ref } from 'vue'
import AppLogo from './AppLogo'
import Menu from './Menu'
import MenuList from './MenuList'
import MenuCollections from '@mock/menu'

export default {
  components: {
    AppLogo,
    Menu,
    MenuList,
  },
  setup() {
    let menus = ref(MenuCollections)

    return {
      menus,
    }
  },
}
</script>
<style lang="scss" scoped>
.sidebar {
  @apply w-64 z-50 max-h-full overflow-y-scroll;
  @apply md:fixed md:top-0 md:shadow-xl text-left;
}
</style>
