<template>
  <div class="pagination" v-if="data.show">
    <div class="pagination-info">
      <p class="text-sm text-gray-500">
        Showing
        <span class="font-medium" v-text="getInfoResults.from"></span>
        to
        <span class="font-medium" v-text="getInfoResults.to"></span>
        of
        <span class="font-medium" v-text="getInfoResults.of"></span>
        results
      </p>
    </div>

    <div class="pagination-page">
      <span href="#" class="nav-btn" v-if="false">
        <img svg-inline="@icons/arrow.svg" />
      </span>

      <template v-for="(page, key) in data.pages" :key="key">
        <span href="#" class="page-number" :class="getCurrentPageClass(page)" v-text="page"></span>
      </template>
      
      <span href="#" class="nav-btn">
        <img svg-inline src="@icon/arrow.svg" />
      </span>
    </div>
  </div>
</template>
<script>
import { computed } from 'vue'

export default {
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  setup(props) {
    const getCurrentPageClass = page => {
      const { data: { currentPage } } = props

      return {'active': page === currentPage}
    }

    const getInfoResults = computed(() => {
      const { data: { pages, total } } = props

      return {
        from: pages[0],
        to: pages[pages.length - 1],
        of: total
      }
    })
    return {
      getCurrentPageClass,
      getInfoResults,
    }
  }
}
</script>
<style lang="scss" scoped>
.pagination {
  @apply px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6;

  &-page {
    @apply relative z-0 inline-flex shadow-sm -space-x-px;

    .page-number {
      @apply w-10 h-10 relative inline-flex cursor-pointer justify-center items-center border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50;

      &.active {
        @apply bg-indigo-700 border-indigo-700 text-gray-200 cursor-default;
      }
    }

    .nav-btn {
      @apply w-10 h-10 relative inline-flex cursor-pointer justify-center items-center rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50;

      svg {
        @apply w-3;
      }
    }
  }
}
</style>
