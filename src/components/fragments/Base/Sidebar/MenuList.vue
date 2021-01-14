<template>
  <template v-for="(itemGroup, i) in data" :key="i">
    <div class="flex flex-col px-6 py-1">
      <p class="uppercase text-xs text-gray-400 mb-4 mt-4 tracking-wider" v-text="itemGroup.title"></p>
      
      <template v-for="(item, j) in itemGroup.lists" :key="j">
        <router-link 
          class="menu-item" 
          :to="item.link" 
          :disabled="!item.link"
          v-text="item.name"></router-link>
      </template>
    </div>
  </template>
</template>
<script>
export default {
  props: {
    data: {
      type: Array, 
      default: () => []
    }
  }
}
</script>
<style lang="scss" scoped>
.menu-item {
  @apply mb-3 capitalize font-medium text-sm text-gray-500 hover:text-gray-600 transition ease-in-out duration-500;

  &[disabled="true"] {
    @apply text-gray-300 cursor-not-allowed;
  }
}
</style>