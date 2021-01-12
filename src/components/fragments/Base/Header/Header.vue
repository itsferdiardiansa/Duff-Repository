<template>
  <section class="page-header">
    <div class="flex h-full px-6 items-center">
      <SearchForm />

      <Navbar />
    </div>
  </section>
</template>
<script>
import SearchForm from './SearchForm'
import Navbar from './Navbar'

export default {
  components: {
    SearchForm,
    Navbar
  }
}
</script>
<style lang="scss" scoped>
.page-header {
  @apply h-16 fixed bg-indigo-800 w-full z-40 box-border;
  top: 0;
  padding-left: 255px;
}
</style>