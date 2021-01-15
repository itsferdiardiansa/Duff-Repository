<template>
  <tr>
    <th width="2%">
      <template v-if="data.selectableRows">
        <input 
          type="checkbox" 
          aria-label="select-all" 
          name="select-all"
          @click="handleSelectAllRows" 
        />
      </template>

      <template v-if="!data.selectableRows">
        <span v-if="data.rowNumber">#</span>
      </template>
    </th>

    <template v-for="(item, key) in data.headers" :key="key">
      <th
        v-text="item.title"
        :colspan="item.colSpan"
        :class="[item.customClass]"
        :width="item.width"
      ></th>
    </template>
  </tr>
</template>
<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => { }
    },
    handleSelectAllRows: {
      type: Function,
      default: () => { }
    }
  }
}
</script>