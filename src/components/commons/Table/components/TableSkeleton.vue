<template>
  <template v-for="i in row" :key="i">
    <tr>
      <template v-for="j in col" :key="j">
        <td class="p-2 text-center">
          <Rect width="85%" height="12px" />
        </td>
      </template>
    </tr>
  </template>
</template>
<script>
import { Rect } from '@common/Skeleton';

export default {
  components: {
    Rect,
  },
  props: {
    col: {
      type: Number,
      default: 0,
    },
    row: {
      type: Number,
      default: 0,
    },
  },
};
</script>
