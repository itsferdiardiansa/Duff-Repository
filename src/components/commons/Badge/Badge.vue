<template>
  <span :class="customClass">
    <slot>{{ label }}</slot>
  </span>
</template>
<script>
import { computed } from 'vue'
export default {
  props: {
    label: {
      type: String,
      default: '',
    },
    variant: {
      type: String,
      default: '',
    },
    shape: {
      type: String,
      default: 'rounded', // no-rounded, rounded, circle
    },
    dot: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: '',
    },
    textBold: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const customClass = computed(() => {
      const { shape, variant, size, textBold, dot } = props
      let _class = ['badge']

      _class.push(shape)

      if (variant) _class.push(variant)

      if (size) _class.push(size)

      if (textBold) _class.push('bold')

      if (dot) _class.push('dot')

      return _class.join(' ').trim()
    })
    return {
      customClass,
    }
  },
}
</script>
<style lang="scss" scoped>
@import './size';
@import './variant';

.badge {
  @apply bg-default px-2 py-0.5 inline-block;

  @include size();

  @include variant();

  &.dot {
    @apply w-2 h-2 p-0 rounded-full;
  }

  &.bold {
    @apply font-bold;
  }

  &.no-rounded {
    @apply rounded-none;
  }

  &.circle {
    @apply rounded-full;
  }
}
</style>
