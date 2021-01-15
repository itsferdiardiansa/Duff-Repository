<template>
  <template v-if="data.items.length && !data.isLoading">
    <template v-for="(item, key) in data.items" :key="key">
      <tr>
        <td class="text-center">
          <template v-if="data.selectableRows && data.rowNumber">
            <input 
              type="checkbox" 
              v-model="selectedRows"
              :name="`select-row-${data.checkboxHashId}-key`" 
              :value="key" 
            />
          </template>
          <template v-else>
            <label v-text="key + 1" v-if="data.rowNumber"></label>
          </template>
        </td>

        <template v-for="(hItem, hKey) in data.headers" :key="hKey">
          <slot name="content" :headers="hItem" :item="item"></slot>
        </template>
      </tr>
    </template>
  </template>
  <template v-else-if="!data.items.length && !data.isFetching">
    <tr >
      <td class="text-center" :colspan="totalColumn">
        <template v-if="!data.emptyDataComponent">
          <label class="italic" v-text="data.emptyTableMessage"></label>
        </template>
        <template v-else>
          <component :is="data.emptyDataComponent"></component>
        </template>
      </td>
    </tr>
  </template>
</template>
<script>
import { computed } from 'vue'

export default {
  props: {
    data: {
      type: Object,
      default: () => {}
    },
    selected: {
      type: Array,
      default: () => []
    }
  },
  setup(props) {
    const textColAlign = align => (align ? `text-${align}` : '')

    let selectedRows = computed(() => {
      const { selected } = props

      return selected
    })

    const totalColumn = computed(() => {
      const { headers, rowNumber } = props.data
      
      return headers.length + ((rowNumber) ? 1 : 0)
    })

    return {
      textColAlign,
      selectedRows,
      totalColumn
    }
  }
}
</script>