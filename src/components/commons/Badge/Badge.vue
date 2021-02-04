<template>
  <div
    :class="customClass"
    :title="title"
  >
    <div :class="`${prefixClass}-badge--wrapper`" v-if="!dot">
      <template v-if="icon.length">
        <div :class="`${prefixClass}-badge--icon`">
          <font-awesome-icon :icon="icon" />
        </div>
      </template>

      <template v-if="hasSlot || label.length">
        <div :class="[`${prefixClass}-badge--label`, {'has-icon': icon.length}]">
          <slot>
            {{ label }}
          </slot>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
import { computed, getCurrentInstance } from 'vue'

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
    tooltip: {
      type: String,
      default: ''
    },
    inverse: {
      type: Boolean,
      default: false
    },
    variant: {
      type: String,
      default: 'light',
      validator: function(variant) {
        return ~['primary', 'danger', 'warning', 'dark', 'success', 'light'].indexOf(variant)
      }
    },
    size: {
      type: String,
      default: 'base',
      validator: function(variant) {
        return ~['xs', 'sm', 'base', 'lg', 'xl'].indexOf(variant)
      }
    },
    icon: {
      type: Array,
      default: () => []
    },
    bold: {
      type: Boolean,
      default: true,
    },
    rounded: {
      type: Boolean,
      default: true,
    },
    pill: {
      type: Boolean,
      default: false
    },
    dot: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { slots }) {
    let root = getCurrentInstance()

    const getVariantClass = (prefixBtnClass) => {
      const { inverse, variant } = props 
      let btnClass = `${prefixBtnClass}--${variant}`

      if(inverse) btnClass += '-inverse'
      
      return btnClass
    }

    const customClass = computed(() => {
      const { data: { prefixClass } } = root
      const { size, rounded, bold, pill, dot, label } = props
      const btnClass = prefixClass.concat('-badge')
      let _class = [btnClass]

      _class.push(getVariantClass(btnClass))

      if(size) _class.push(btnClass.concat('--' + size))

      if (bold) _class.push('text-bold')

      if(pill)
        _class.push('pill')
      else
        if (!rounded) _class.push('no-rounded')

      if(dot && (!hasSlot.value && !label.length)) _class.push('dot')

      return [_class.join(' ')]
    })

    const hasSlot = computed(() => (
      !!slots.default
    ))

    return {
      customClass,
      hasSlot
    }
  },
}
</script>
<style lang="scss">
@import './variant.scss';
@import './size.scss';

.#{$prefixClass}-badge {
  @apply h-9 focus:outline-none rounded px-3 transition duration-300 relative inline-block;
  @apply text-gray-800 overflow-hidden whitespace-nowrap;

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
    @apply h-full flex-grow-0 flex flex-wrap items-center justify-center;
  }

  &--label {
    @apply pt-0.5;

    &.has-icon {
      @apply ml-2;
    }
  }
}
</style>