<template>
  <section class="app-header">
    <div class="app-header--container">
      <Navbar />
    </div>
  </section>
</template>
<script>
// import SearchForm from './SearchForm'
import Navbar from './Navbar'

export default {
  components: {
    // SearchForm,
    Navbar,
  },
}
</script>
<style lang="scss" scoped>
.app-header {
  @apply fixed bg-indigo-800 w-full z-40 box-border;
  top: 0;
  height: $pageHeaderHeight;

  &--container {
    @apply flex h-full px-6 items-center;
  }
}
</style>
