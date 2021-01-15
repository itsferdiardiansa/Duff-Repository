<template>
  <button 
    :class="customClass" 
    :disabled="disabled"
    @click="handleClick"
  >
    <slot>{{ label }}</slot>
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
    variant: {
      type: String,
      default: '',
    },
    size: {
      type: String,
      default: 'sm',
    },
    onClick: {
      type: Function,
      default: () => { },
    },
    textBold: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    rounded: {
      type: Boolean,
      default: true
    }
  },
  setup(props) {
    const customClass = computed(() => {
      let { variant, size, textBold, disabled, rounded } = props
      let _class = []

      _class.push(size)

      if(variant) _class.push(variant)
      
      if(!rounded) _class.push('no-rounded')

      if(textBold) _class.push('bold')

      if(disabled) _class.push('disabled')
      
      return _class.join(' ').trim()
    })

    const handleClick = () => {
      props.onClick()
    }

    return {
      customClass,
      handleClick,
    }
  },
}
</script>
<style lang="scss" scoped>
@import './variant.scss';
@import './size.scss';

button {
  @apply text-gray-50 focus:outline-none rounded py-2 px-3 transition duration-300 flex items-center justify-center;
  @apply bg-gray-200 hover:bg-gray-300 text-gray-800;

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

}
</style>
