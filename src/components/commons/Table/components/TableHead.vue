<template>
  <thead class="table-content__head">
    <tr>
      <th width="4%">
        <template v-if="selectableRows">
          <input
            type="checkbox"
            aria-label="select-all"
            ref="checkboxSelectAllEl"
            @click="handleSelectAllRows"
          />
        </template>

        <template v-if="!selectableRows">
          <span v-if="rowNumber">#</span>
        </template>
      </th>

      <template v-for="(item, key) in headers" :key="key">
        <th
          v-text="item.title"
          :colspan="item.colSpan"
          :class="[item.customClass]"
          :width="item.width"
          :align="item.align"
        ></th>
      </template>
    </tr>
  </thead>
</template>
<script>
import { ref, unref, watch } from 'vue'

export default {
  props: {
    handleSelectAllRows: {
      type: Function,
      default: () => {},
    },
    selectedRows: {
      type: Object,
      required: true
    }
  },
  setup(props, { attrs }) {
    const checkboxSelectAllEl = ref()
    const { selectedRows } = unref(props)
    const { items } = attrs

    watch(
      () => selectedRows.ids, 
      () => {
        let _el = unref(checkboxSelectAllEl)

        if((selectedRows.ids.length < items.length) && _el.checked)
          _el.checked = false

      }
    )

    return {
      ...attrs,
      checkboxSelectAllEl
    }
  }
}
</script>
