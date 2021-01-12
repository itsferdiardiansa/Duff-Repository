<template>
  <div class="search flex-auto">
    <TextField 
      placeholder="Search"
      size="large"
      class="search-input"
    />
  </div>
</template>
<script>
import TextField from '@common/TextField'

export default {
  components: {
    TextField
  }
}
</script>
<style lang="scss" scoped>
.search {
  @apply w-2/4 max-w-md;

  &-input {
    @apply bg-gray-200 bg-opacity-25 transition duration-500 placeholder-gray-200 placeholder-opacity-25;

    &:focus {
      @apply bg-gray-50 placeholder-opacity-100 placeholder-gray-800;
    }
  }
}
</style>