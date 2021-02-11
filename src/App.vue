<template>
  <AppWrapper>
    <router-view />
  </AppWrapper>
</template>
<script>
/* eslint-disable */
import AppWrapper from '@base/AppWrapper'
import LoadingComponent from '@fragment/@Base/Loading'

export default {
  name: 'AppRoot',
  components: {
    AppWrapper,
    LoadingComponent,
  },
  setup() {},
}
</script>
