<template>
  <div :class="`${prefixClass}-tb--action`">
    <div class="wrapper">
      <template v-for="(item, key) in data" :key="key">
        <Button
          :label="item.text"
          :variant="item.variant"
          :icon="item.icon"
          :bold="item.bold"
          :inverse="item.inverse"
          :data-id="new Date().getTime()"
          @click="($event, $attrs) => item.onClickFn($event, dataBind)"
        />
      </template>
    </div>
  </div>
</template>
<script>
import { unref } from 'vue'
import Button from '@common/Button'

export default {
  components: {
    Button
  },
  props: {
    data: {
      type: Array,
      default: () => []
    },
    item: {
      type: [Array, String, Number, Object, Boolean]
    }
  },
  setup(props) {
    return {
      dataBind: unref(props.item)
    }
  }
}
</script>
<style lang="scss" scoped>
.#{$prefixClass}-tb--action {
  @apply flex justify-center;

  .wrapper {
    @apply mr-2 grid grid-flow-col gap-2;
  }
}
</style>