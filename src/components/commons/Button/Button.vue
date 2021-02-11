<template>
  <button :class="customClass" :disabled="disabled">
    <div :class="`${prefixClass}-button--wrapper`">
      <template v-if="icon.length">
        <div :class="`${prefixClass}-button--icon`">
          <font-awesome-icon :icon="icon" ref="iconEl" />
        </div>
      </template>

      <template v-if="hasSlot || label.length">
        <div
          :class="[`${prefixClass}-button--label`, { 'has-icon': icon.length }]"
        >
          <slot>
            {{ label }}
          </slot>
        </div>
      </template>
    </div>
  </button>
</template>
<script>
import { computed, getCurrentInstance, ref } from 'vue'
import defaultProps from './props'

export default {
  name: 'CButton',
  props: defaultProps,
  emits: ['increment'],
  setup(props, { emit, slots }) {
    let root = getCurrentInstance()
    let iconEl = ref()

    const getVariantClass = prefixBtnClass => {
      const { inverse, variant } = props
      let btnClass = `${prefixBtnClass}--${variant}`

      if (inverse) btnClass += '-inverse'

      return btnClass
    }

    const customClass = computed(() => {
      const {
        data: { prefixClass },
      } = root
      const { size, disabled, rounded, bold, pill } = props
      const btnClass = prefixClass.concat('-button')
      let customClass = [btnClass]

      customClass.push(getVariantClass(btnClass))

      if (size) customClass.push(btnClass.concat('--' + size))

      if (bold) customClass.push('text-bold')

      if (pill) customClass.push('pill')
      else if (!rounded) customClass.push('no-rounded')

      if (disabled) customClass.push('disabled')

      return [customClass.join(' ')]
    })

    const handleClick = e => {
      emit('click', e)
    }

    const hasSlot = computed(() => !!slots.default)

    return {
      customClass,
      handleClick,
      hasSlot,
      iconEl,
    }
  },
}
</script>
<style lang="scss">
@import './variant.scss';
@import './size.scss';

.#{$prefixClass}-button {
  @apply h-9 focus:outline-none rounded px-3 transition duration-300 relative;
  @apply hover:bg-gray-300 text-gray-800 overflow-hidden whitespace-nowrap;

  @include variant;

  @include size;

  &.no-rounded {
    @apply rounded-none;
  }

  &.pill {
    @apply rounded-full;
  }

  &.text-bold {
    @apply font-bold;
  }

  &.disabled {
    @apply disabled:opacity-70 pointer-events-none;
  }

  &--wrapper {
    @apply flex-grow-0 flex flex-wrap items-center justify-center;
  }

  &--label {
    @apply pt-0.5;

    &.has-icon {
      @apply ml-2;
    }
  }
}
</style>
