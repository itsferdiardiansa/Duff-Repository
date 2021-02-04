<template>
  <transition name="fade-slide" appear>
    <div
      :class="customClass"
      v-if="onShow"
    >
      <div :class="`${prefixClass}-alert--wrapper`">
        <div :class="`${prefixClass}-alert--close`" @click="closeAlert">
          <font-awesome-icon :icon="['fa', 'times']" />
        </div>

        <div v-html="content"></div>
      </div>
    </div>
  </transition>
</template>
<script>
import { computed, getCurrentInstance, inject, ref, watch } from 'vue'

export default {
  props: {
    inverse: {
      type: Boolean,
      default: false
    },
  },
  setup(props, { slots }) {
    let root = getCurrentInstance()
    let emits = inject('$emitter')
    let onShow = ref(false)
    let content = ref('')
    let variant = ref('light')
    let timeout = ref(2000)
    // let component = reactive({})

    emits.on('show-alert', (e) => {
      onShow.value  = true
      
      content.value = e.content

      if(Reflect.has(e, 'variant'))
        variant.value = e.variant

      if(Reflect.has(e, 'timeout'))
        timeout.value = e.timeout
    })

    const getVariantClass = (prefixBtnClass) => {
      const { inverse } = props
      let btnClass = `${prefixBtnClass}--${variant.value}`

      if(inverse) btnClass += '-inverse'
      
      return btnClass
    }

    const customClass = computed(() => {
      const { data: { prefixClass } } = root
      const alertClass = prefixClass.concat('-alert')
      let _class = [alertClass]

      _class.push(getVariantClass(alertClass))


      return [_class.join(' ')]
    })

    const hasSlot = computed(() => (
      !!slots.default
    ))

    const closeAlert = () => {
      onShow.value = false
    }

    watch(() => onShow.value, (state) => {
      if(state)
        setTimeout(() => {
          onShow.value  = false
          timeout.value = 2000
        }, timeout.value)
    })

    return {
      customClass,
      hasSlot,
      onShow,
      content,
      closeAlert
    }
  },
}
</script>
<style lang="scss">
@import './variant.scss';

.#{$prefixClass}-alert {
  @apply w-10/12 max-w-sm h-auto bg-light rounded p-3 transition duration-300 fixed top-10 inset-x-0 mx-auto;
  @apply text-gray-800 overflow-hidden;
  z-index: 9999;

  @include variant;

  &--wrapper {
    @apply h-full pr-2 flex-grow-0 flex flex-wrap items-center justify-center;
  }

  &--close {
    @apply absolute right-3.5 top-3.5 cursor-pointer;

    svg {
      @apply w-3;
    }
  }
}
</style>