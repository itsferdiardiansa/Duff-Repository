<template>
  <div :class="`${prefixClass}-pagination`" v-if="getPagination.isApplicable">
    <div :class="`${prefixClass}-pagination--info`">
      <p>
        Showing
        <span v-text="getPagination.info.from"></span>
        to
        <span v-text="getPagination.info.to"></span>
        of
        <span v-text="getPagination.info.of"></span>
        results
      </p>
    </div>

    <div :class="`${prefixClass}-pagination--page`">
      <span
        class="nav-btn prev"
        v-if="getPagination.prevBtn"
        @click="handlePageChange('prev')"
      >
        <img svg-inline src="@icon/arrow.svg" />
      </span>

      <template v-for="(page, key) in getPagination.pages" :key="key">
        <span
          class="page-number"
          :class="getCurrentPageClass(page)"
          @click="handlePageChange(page)"
          v-text="page"
        ></span>
      </template>

      <span
        class="nav-btn next"
        v-if="getPagination.nextBtn"
        @click="handlePageChange('next')"
      >
        <img svg-inline src="@icon/arrow.svg" />
      </span>
    </div>
  </div>
</template>
<script>
import { computed } from 'vue';
import usePagination from './hooks/usePagination';

export default {
  name: 'CMPagination',
  emits: ['changePage'],
  props: {
    current_page: {
      type: Number,
    },
    total_page: {
      type: Number,
    },
    per_page: {
      type: Number,
    },
  },
  setup(props, { emit }) {
    const getProps = computed(() => ({ ...props }));
    const getCurrentPageClass = page => {
      const { current_page } = props;

      return { active: page === current_page };
    };

    const { getPagination } = usePagination(getProps);

    const handlePageChange = page => {
      const { current_page, per_page } = props;
      let value = { page: null, limit: per_page };

      switch (page) {
        case 'prev':
          value.page = current_page - 1;
          break;
        case 'next':
          value.page = current_page + 1;
          break;
        default:
          value.page = page;
          break;
      }

      emit('changePage', value);
    };

    return {
      getPagination,
      getCurrentPageClass,
      handlePageChange,
    };
  },
};
</script>
<style lang="scss" scoped>
.#{$prefixClass}-pagination {
  @apply px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6;

  &--info {
    p {
      @apply text-sm text-gray-500;

      span {
        @apply font-medium;
      }
    }
  }

  &--page {
    @apply relative z-0 inline-flex shadow-sm -space-x-px;

    .page-number {
      @apply w-10 h-10 relative inline-flex cursor-pointer justify-center items-center border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50;

      &.active {
        @apply bg-primary border-primary text-gray-200 cursor-default;
      }
    }

    .nav-btn {
      @apply w-10 h-10 relative inline-flex cursor-pointer justify-center items-center;
      @apply mx-0 bg-white text-sm font-medium border border-gray-300 text-gray-500 hover:bg-gray-50;

      &.prev {
        @apply rounded-l-md;

        svg {
          @apply transform rotate-180;
        }
      }

      &.next {
        @apply rounded-r-md;
      }
      svg {
        @apply w-3;
      }
    }
  }
}
</style>
