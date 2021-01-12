<template>
  <button
  :className="customClassName"
  v-text="label"
  >
  </button>
</template>
<script>
export default {
  props: {
    label: {
      type: String,
      default: ''
    },
    variant: {
      type: String,
      default: 'primary'
    },
    size: {
      type: String, 
      default: 'default'
    }
  },
  computed: {
    customClassName() {
      const { variant, size } = this
      let className = []

      switch(variant) {
        case 'primary':
          className.push('bg-indigo-800')
          break
        case 'danger':
          className.push('bg-red-600')
          break
        default:
      }

      switch(size) {
        case 'large':
          className.push('p-2')
          break
        default:
      }

      return className.join(' ')
    }
  }
}
</script>
<style lang="scss" scoped>
button {
  @apply border-0 text-gray-50 py-2 px-6 rounded;
}
</style>