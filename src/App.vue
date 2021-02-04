<template>
  <AppWrapper>
    <router-view />
  </AppWrapper>
</template>
<script>
import AppWrapper from '@lib/appWrapper'

export default {
  name: 'App',
  components: {
    AppWrapper
  },
}
</script>
