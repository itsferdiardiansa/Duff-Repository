<template>
  <button
    :class="customClass"
    :disabled="disabled"
    :title="title"
    @click="handleClick($event)"
  >
    <div class="btn-wrapper">
      <slot>{{ label }}</slot>
    </div>
  </button>
</template>
<script>
import { computed } from 'vue'

export default {
  props: {
    label: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    variant: {
      type: String,
      default: '',
    },
    size: {
      type: String,
      default: '',
    },
    textBold: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    rounded: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, { emit }) {
    const customClass = computed(() => {
      let { variant, size, textBold, disabled, rounded } = props
      let _class = ['btn']

      _class.push(size)

      if (variant) _class.push(variant)

      if (!rounded) _class.push('no-rounded')

      if (textBold) _class.push('bold')

      if (disabled) _class.push('disabled')

      return _class.join(' ').trim()
    })

    const handleClick = e => {
      emit('click', e)
    }

    return {
      customClass,
      handleClick,
    }
  },
}
</script>
<style lang="scss">
@import './variant.scss';
@import './size.scss';

.btn {
  @apply h-9 text-gray-50 focus:outline-none rounded px-3 transition duration-300;
  @apply bg-gray-100 hover:bg-gray-300 text-gray-800 text-sm overflow-hidden whitespace-nowrap;

  @include variant;

  @include size;

  &.no-rounded {
    @apply rounded-none;
  }

  &.bold {
    @apply font-bold;
  }

  &.disabled {
    @apply disabled:opacity-70 pointer-events-none;
  }

  &-wrapper {
    @apply flex-grow-0 flex items-center justify-center;
  }
}
</style>
