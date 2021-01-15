<template>
  <div class="pagination">
    <div class="pagination-wrapper">
      <nav class="pagination-links">
        <div>
          <a href="#" class="item"> 1 </a>
        </div>
      </nav>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.pagination {
  @apply sm:flex-1 sm:flex sm:justify-end mt-4;

  &-wrapper {
    @apply float-right;
  }

  &-links {
    @apply sm:flex-1 sm:flex sm:justify-end mt-4;

    .item {
      @apply -ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-tertiary active:text-gray-700 transition ease-in-out duration-150 hover:bg-tertiary;
    }
  }
}
</style>
