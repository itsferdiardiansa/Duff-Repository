<template>
  <ContentWrapper>
    <HeroList />
  </ContentWrapper>
</template>
<script>
/* eslint-disable */
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import ContentWrapper from '@base/Content/ContentWrapper';
import Card from '@common/Card';
import HeroList from '@fragment/Hero/List';

export default {
  components: {
    Card,
    ContentWrapper,
    HeroList,
  },
  setup() {
    const route = useRoute();

    const isParent = computed(() => {
      return route.name === 'Hero';
    });

    return {
      isParent,
    };
  },
};
</script>
<style lang="scss" scoped>
.wrapper {
  @apply py-3 px-5;
}
</style>
