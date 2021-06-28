<template>
  <AppWrapper>
    <router-view />
  </AppWrapper>
</template>
<script>
/* eslint-disable */
import { getCurrentInstance } from 'vue';
import AppWrapper from '@base/AppWrapper';
import LoadingComponent from '@fragment/@Base/Loading';
import * as utils from '@util';

export default {
  name: 'AppRoot',
  components: {
    AppWrapper,
    LoadingComponent,
  },
  created() {
    const root = getCurrentInstance();

    root.appContext.config.globalProperties.$util = utils;
  },
};
</script>
