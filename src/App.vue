<template>
  <MainLayout>
    <router-view></router-view>
  </MainLayout>
</template>
<script>
import MainLayout from '@layout/MainLayout'

export default {
  name: 'App',
  components: {
    MainLayout,
  },
}
</script>
