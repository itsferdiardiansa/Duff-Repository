<template>
  <TableFilter v-if="withFilter" :data="filteredOptions" />

  <table :class="`${prefixClass}-table`">
    <TableHead
      v-bind="{ ...$props }"
      :handleSelectAllRows="selectAllRows"
      :selectedRows="selectedRows"
    />

    <TableBody
      :data="$props"
      :selectedRows="selectedRows"
      @onFailedFetchHandler="handleFailedFetch"
    >
      <template #content="{ data: { item, headers } }">
        <slot :data="item" :name="headers.accessor" />
      </template>
    </TableBody>
  </table>

  <template v-if="showPagination">
    <Pagination v-bind="{ ...pagination }" @changePage="onPageChange" />
  </template>
</template>
<script>
import { computed, reactive, unref, watch } from 'vue';
import TableHead from './components/TableHead';
import TableBody from './components/TableBody';
import TableFilter from './components/TableFilter';
import Pagination from '@common/Pagination';
import { collectObjectKeys } from '@util/object';
import defaultProps from './props';

export default {
  components: {
    TableHead,
    TableBody,
    Pagination,
    TableFilter,
  },
  emits: [
    'onSearchCallback',
    'onSelectedRowCallback',
    'onFailedFetchHandler',
    'onPageChange',
  ],
  props: defaultProps,
  setup(props, { emit }) {
    const getProps = computed(() => ({ ...props }));
    const selectedRows = reactive({
      ids: [],
      items: [],
    });

    const showPagination = computed(() => {
      const { withPagination, isFetching, items } = unref(getProps);

      return Boolean(!isFetching && items.length && withPagination);
    });

    const selectAllRows = e => {
      const { items } = props;

      if (!e.target.checked) {
        selectedRows.ids = [];

        return false;
      }

      selectedRows.ids = items.map((item, key) => {
        return key;
      });
    };

    const filteredOptions = computed(() => {
      let { filterOptions, items } = props;

      return filterOptions.length ? filterOptions : collectObjectKeys(items);
    });

    watch(
      () => selectedRows.ids,
      ids => {
        selectedRows.items = ids.map(item => {
          return props.items[item];
        });

        emit('onSelectedRowCallback', selectedRows);
      }
    );

    return {
      selectedRows,
      selectAllRows,
      filteredOptions,
      showPagination,
      handleFailedFetch: () => alert('Fetch'),
    };
  },
};
</script>
<style lang="scss" src="./styles.scss"></style>
