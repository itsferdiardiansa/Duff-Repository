<template>
  <aside class="sidebar animated faster">
    <div class="px-6 py-5 h-16 bg-indigo-900">
      <a href="javascript:void(0);" class="text-xl text-gray-50">
        <span>
          Loket<strong class="font-black">CMS</strong>
        </span>
      </a>
    </div>

    <div class="menu-list">
      <MenuList :data="menus" />
    </div>
  </aside>
</template>
<script>
import MenuList from './MenuList'
import MenuCollections from '@mock/menu'

export default {
  components: {
    MenuList
  },
  data() {
    return {
      menus: MenuCollections 
    }
  }
}
</script>
<style lang="scss" scoped>
.sidebar {
  @apply w-64 z-50 max-h-full overflow-y-scroll;
  @apply md:fixed md:top-0 md:shadow-xl text-left;

  .menu-list {
    @apply flex flex-col w-full overflow-y-scroll;
    height: calc(100vh - 64px);
  }
}
</style>