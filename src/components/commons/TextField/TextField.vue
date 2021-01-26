<template>
  <input :type="type" :placeholder="placeholder" :class="className" />
</template>
<script>
export default {
  props: {
    type: {
      type: String,
      default: 'text', // text, email, password
    },
    placeholder: {
      type: String,
      default: '',
    },
    color: {
      type: String,
      default: 'white',
    },
    size: {
      type: String,
      default: 'default',
    },
  },
  computed: {
    className() {
      let className = ['input-text']

      if (this.size === 'large') className.push('large')
      else if (this.size === 'small') className.push('small')

      return className.join(' ')
    },
  },
}
</script>
<style lang="scss" scoped>
.input-text {
  @apply w-full rounded py-1 px-2 text-sm border-0;

  &.large {
    @apply h-10 text-lg;
  }

  &:focus {
    @apply outline-none;
  }
}
</style>
