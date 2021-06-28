<template>
  <div :class="`${prefixClass}-pagination`" v-if="getPagination.isApplicable">
    <div :class="`${prefixClass}-pagination--info`" v-if="false">
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

    <transition-group
      name="slide-left"
      tag="div"
      mode="out-in"
      v-bind="$attrs"
      :class="`${prefixClass}-pagination--page`"
    >
      <span
        class="nav-btn prev"
        v-if="getPagination.prevBtn"
        @click="handlePageChange('prev')"
        key="nav"
      >
        <font-awesome-icon :icon="['fa', 'chevron-left']" />
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
        type="nav"
        @click="handlePageChange('next')"
      >
        <font-awesome-icon :icon="['fa', 'chevron-right']" />
      </span>
    </transition-group>
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
      default: 1,
    },
    total_page: {
      type: Number,
      default: 0,
    },
    per_page: {
      type: Number,
      default: 10,
    },
    last_page: {
      type: Number,
      default: 0,
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

      if (page === current_page) return false;

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
  @apply px-4 py-3 flex items-center justify-center sm:px-6 transition-all duration-500;

  &--info {
    p {
      @apply text-sm text-gray-500;

      span {
        @apply font-medium;
      }
    }
  }

  &--page {
    @apply relative z-0 grid grid-flow-col gap-1 cursor-pointer;

    .page-number {
      @apply w-8 h-8 relative flex justify-center items-center rounded-md text-sm font-medium;
      @apply border border-transparent hover:border-gray-300 text-gray-300;

      &.active {
        @apply text-orange cursor-default;
      }
    }

    .nav-btn {
      @apply w-full h-8 px-2 relative flex justify-center items-center;
      @apply mx-0 text-sm font-medium text-orange fill-current;

      svg {
        @apply w-2;
      }

      label {
        @apply mx-2 pointer-events-none;
      }
    }
  }
}
</style>
