<template>
  <table>
    <thead>
      <TableHeadRow :data="allProps" :handleSelectAllRows="selectAllRows" />
    </thead>
    <tbody>
      <template v-if="isLoading">
        <TableSkeleton :col="totalColumn" :row="rowLoader" />
      </template>

      <TableContent :data="allProps" :selected="selectedRows">
        <template v-slot:content="props">
          <td :class="textColAlign(props.headers.align)">
            <slot :data="props.item" :name="props.headers.accessor">
              {{ props.item[props.headers.accessor] }}
            </slot>
          </td>
        </template>
      </TableContent>
    </tbody>
  </table>

  <template v-if="withPagination">
    <Pagination />
  </template>
</template>
<script>
import { computed, ref } from 'vue'
import TableHeadRow from './TableHeadRow'
import TableContent from './TableContent'
import TableSkeleton from './TableSkeleton'
import Pagination from '@common/Pagination'

export default {
  components: {
    TableHeadRow,
    TableContent,
    TableSkeleton,
    Pagination,
  },
  props: {
    headers: {
      type: [Array],
      default: () => [],
    },
    items: {
      type: [Array],
      default: () => [],
    },
    emptyTableMessage: {
      type: String,
      default: 'Data kosong',
    },
    rowNumber: {
      type: Boolean,
      default: true,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    rowLoader: {
      type: Number,
      default: 5,
    },
    emptyDataComponent: {
      type: Object,
      default: () => {},
    },
    selectableRows: {
      type: Boolean,
      default: false,
    },
    withPagination: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    const textColAlign = align => (align ? `text-${align}` : '')
    const selectedRows = ref([])

    const selectAllRows = e => {
      const { items } = props

      if (!e.target.checked) return false

      selectedRows.value = items.map((item, key) => {
        return key
      })
    }

    const totalColumn = computed(() => {
      const { headers, rowNumber } = props

      return headers.length + (rowNumber ? 1 : 0)
    })

    const checkboxHashId = computed(() => {
      return [
        Math.floor(1000 + Math.random() * 9000),
        Math.floor(10000 + Math.random() * 90000),
      ].join('-')
    })

    return {
      allProps: computed(() => ({ ...props, selectedRows })),
      textColAlign,
      totalColumn,
      checkboxHashId,
      selectedRows,
      selectAllRows,
    }
  },
}
</script>
<style lang="scss">
table {
  @apply w-full text-sm;

  thead {
    @apply text-center;
  }

  th {
    @apply uppercase leading-normal py-3 border-b-2 border-gray-700;
  }

  td {
    @apply text-gray-600 leading-normal relative py-3 break-all;
  }
}
</style>
