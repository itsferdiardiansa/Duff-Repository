<template>
  <tbody class="table-content__body">
     <template v-if="data.showLoader">
      <TableSkeleton :col="totalColumn" :row="data.rowLoader" />
    </template>

    <TableContent :data="data" :selected="selectedRows" @onFailedFetchHandler="handleFailedFetch">
      <template #content="props">
        <td class="table-content__body-col" :class="textColAlign(props.headers.align)">
          <slot name="content" :data="props">
            {{ props.item[props.headers.accessor] }}
          </slot>
        </td>
      </template>
    </TableContent>
  </tbody>
</template>
<script>
import { computed, unref } from 'vue'
import TableContent from './TableContent'
import TableSkeleton from './TableSkeleton'

export default {
  components: {
    TableContent,
    TableSkeleton
  },
  props: {
    selectedRows: {
      type: Object,
      default: () => { }
    },
    selectAllRows: {
      type: Function,
      default: () => {}
    },
    data: {
      type: Object,
      default: () => {}
    }
  },
  emits: [
    'onSearchCallback',
    'onSelectedRowCallback',
    'onFailedFetchHandler'
  ],
  setup(props) {
    const { data: { onFailedFetchHandler } } = unref(props)
    const textColAlign = align => (align ? `text-${align}` : '')
    
    const totalColumn = computed(() => {
      const { headers, rowNumber } = props.data

      return headers.length + (rowNumber ? 1 : 0)
    })

    return {
      textColAlign,
      totalColumn,
      handleFailedFetch: () => onFailedFetchHandler()
    }
  }
}
</script>
