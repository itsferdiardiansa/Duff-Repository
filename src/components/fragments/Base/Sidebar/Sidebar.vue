<template>
  <aside class="sidebar animated faster">
    <div class="px-6 py-5 h-16 bg-blue-700">
      <a href="javascript:void(0);" class="text-xl text-gray-50">
        <span>Loket </span>
        <strong class="font-black">CMS</strong>
      </a>
    </div>

    <div class="flex flex-col p-6">
      <p class="uppercase text-xs text-gray-600 mb-4 mt-4 tracking-wider">Live Streaming</p>

      <a href="javascript:void(0);" class="mb-3 capitalize font-medium text-sm hover:text-teal-600 transition ease-in-out duration-500">
        <!-- <i class="fa fa-television"></i> -->
        Event Live Streaming
      </a>

      <a href="javascript:void(0);" class="mb-3 capitalize font-medium text-sm hover:text-teal-600 transition ease-in-out duration-500">
        <!-- <i class="fad fa-comments text-xs mr-2"></i> -->
        Event Calender
      </a>
    </div>
  </aside>
</template>
<script>
export default {
  
}
</script>
<style lang="scss" scoped>
.sidebar {
  @apply relative flex flex-col flex-wrap flex-none w-64;
  @apply md:fixed md:top-0 md:z-30 md:h-screen md:shadow-xl text-left;
}
</style>