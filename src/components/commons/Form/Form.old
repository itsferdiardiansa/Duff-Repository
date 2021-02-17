<template>
  <div :class="`${prefixClass}-form`">
    <div :class="`${prefixClass}-form--loading`" v-if="isFetching">
      <Loading />
    </div>

    <form :class="`${prefixClass}-form--content`" @submit.prevent="handleSubmit">
      <slot />
    </form>
  </div>
</template>
<script>
/* eslint-disable */
import Loading from '@fragment/@Base/Loading'
import { getCurrentInstance } from 'vue'

export default {
  components: {
    Loading
  },
  props: {
    onSubmitFn: {
      type: Function,
      default: () => {}
    },
    isFetching: {
      type: Boolean,
      default: false
    },
    formats: {
      type: Array,
      default: () => []
    }
  },
  setup(props, { slots }) {
    const root = getCurrentInstance()

    const handleSubmit = () => {
      const { isFetching, onSubmitFn } = props

      !isFetching && onSubmitFn() 
    }

    return {
      handleSubmit
    }
  }
}
</script>
<style lang="scss" scoped>
.#{$prefixClass}-form {
  @apply px-8 pt-6 pb-8 mb-4 flex flex-col my-2 relative;

  &--loading {
    @apply w-full h-full block;

    div {
      @apply w-full h-full absolute z-10;
      background-color: rgba(255, 255, 255, .5);
    }
  }
}
</style>