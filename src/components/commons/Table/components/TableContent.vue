<template>
  <template v-if="data.items.length && !data.showLoader">
    <template v-for="(item, key) in data.items" :key="key">
      <tr :class="getRowClass(key)" :ref="countDataRows">
        <td class="table-content__body-col">
          <template v-if="data.selectableRows && data.rowNumber">
            <input
              type="checkbox"
              class="cursor-pointer"
              v-model="selectedRows.ids"
              :name="`select-row-${checkboxHashId}-key`"
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
  <template v-else-if="!data.items.length && !data.showLoader">
    <tr :ref="countDataRows">
      <td class="table-content__body-col" :colspan="totalColumn">
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
import { computed , defineComponent, ref } from 'vue'

export default defineComponent({
  props: {
    data: {
      type: Object,
      default: () => {},
    },
    selected: {
      type: Object,
      default: () => {},
    },
  },
  emits: [
    'onFailedFetchHandler'
  ],
  setup(props, { emit }) {
    const dataRows = ref([])

    let selectedRows = computed(() => {
      const { selected } = props

      return selected
    })

    const totalColumn = computed(() => {
      const { headers, rowNumber } = props.data

      return headers.length + (rowNumber ? 1 : 0)
    })

    const checkboxHashId = computed(() => {
      return [
        Math.floor(1000 + Math.random() * 9000),
        Math.floor(10000 + Math.random() * 90000),
      ].join('-')
    })
    
    const getKey = (item, key) => {
      return Reflect.has(item, 'id') ? item.id : key
    }

    const getRowClass = id => ([
      'table-content__body-row',
      {
        'selected': selectedRows.value.ids.includes(id)
      }
    ])

    const handleClick = (item, key) => {
      emit('setSelectedRow', {item, key})
    }

    const countDataRows = el => {
      dataRows.value.push(el)
    }

    return {
      ...props,
      dataRows,
      selectedRows,
      totalColumn,
      checkboxHashId,
      handleClick,
      getKey,
      getRowClass,
      countDataRows
    }
  },
})
</script>
