<template>
  <TableFilter 
    v-if="withFilter"
    :data="filteredOptions"
  />

  <table class="table-content">
    <TableHead v-bind="{...$props}" :handleSelectAllRows="selectAllRows" :selectedRows="selectedRows" />
    
    <TableBody :data="$props" :selectedRows="selectedRows" @onFailedFetchHandler="handleFailedFetch">
      <template #content="{data: { item, headers }}">
        <slot :data="item" :name="headers.accessor" />
      </template>
    </TableBody>
  </table>

  <template v-if="showPagination">
    <Pagination 
      :data="getPagination"
    />
  </template>
</template>
<script>
import { computed, reactive, unref, watch } from 'vue'
import TableHead from './components/TableHead'
import TableBody from './components/TableBody'
import TableFilter from './components/TableFilter'
import Pagination from '@common/Pagination'
import collectObjectKeys from '@util/collectObjectKeys'
import defaultProps from './props'
import usePagination from './hooks/usePagination'

export default {
  components: {
    TableHead,
    TableBody,
    Pagination,
    TableFilter
  },
  emits: [
    'onSearchCallback',
    'onSelectedRowCallback',
    'onFailedFetchHandler'
  ],
  props: defaultProps,
  setup(props, { emit }) {
    const getProps = computed(() => ({...props}))
    const selectedRows = reactive({
      ids: [],
      items: []
    })

    const { getPagination } = usePagination(getProps)

    const showPagination = computed(() => {
      const { withPagination, showLoader, items } = unref(getProps)

      return (!showLoader && items.length && withPagination)
    })

    const selectAllRows = e => {
      const { items } = props
      
      if(!e.target.checked) {
        selectedRows.ids = [] 

        return false
      }

      selectedRows.ids = items.map((item, key) => {
        return key
      })
    }

    const filteredOptions = computed(() => {
      let { filterOptions, items } = props

      return filterOptions.length ? filterOptions : collectObjectKeys(items)
    })

     watch(
      () => selectedRows.ids,
      (ids) => {
        selectedRows.items = ids.map(item => {
          return props.items[item]
        })

        emit('onSelectedRowCallback', selectedRows)
      }
    )

    return {
      selectedRows,
      selectAllRows,
      filteredOptions,
      getPagination,
      showPagination,
      handleFailedFetch: () => alert('Fetch')
    }
  },
}
</script>
<style lang="scss">
.table-content {
  @apply w-full text-sm;

  &__head {
    @apply text-center;
  
    th {
      @apply uppercase leading-normal py-3 border-b-2 border-gray-700;
    }
  }

  &__body {
    &-row {
      @apply hover:bg-blue-100 transition duration-500 ease-in-out;

      &.selected {
        @apply bg-blue-100;
      }
    }

    &-col {
      @apply text-gray-600 leading-normal relative py-4 break-all text-center;
    }
  }
}
</style>
