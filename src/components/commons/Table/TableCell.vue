<template>
  <template  v-if="!cellHead">
    <td class="px-6 py-4 border-b border-gray-500">
      <slot></slot>
    </td>
  </template>
  <template v-else>
    <th class="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-800 tracking-wider">
      <slot></slot>
    </th>
  </template>
</template>
<script>
export default {
  props: {
    cellHead: {
      type: Boolean,
      default: true
    }
  }
}
</script>