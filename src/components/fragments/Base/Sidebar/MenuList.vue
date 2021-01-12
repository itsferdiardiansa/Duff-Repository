<template>
  <template v-for="(itemGroup, i) in data" :key="i">
    <div class="flex flex-col px-6 py-1">
      <p class="uppercase text-xs text-gray-400 mb-4 mt-4 tracking-wider" v-text="itemGroup.title"></p>
      
      <template v-for="(itemList, j) in itemGroup.lists" :key="j">
        <a href="javascript:void(0);" class="mb-3 capitalize font-medium text-sm text-gray-500 hover:text-teal-600 transition ease-in-out duration-500" v-text="itemList.name"></a>
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