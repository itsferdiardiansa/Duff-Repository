<template>
  <ContentWrapper>
    <ContentList />
  </ContentWrapper>
</template>
<script>
import ContentWrapper from '@base/Content/ContentWrapper';
import ContentList from '@fragment/Partner/List';

export default {
  components: {
    ContentWrapper,
    ContentList,
  },
};
</script>
<style lang="scss" scoped>
.wrapper {
  @apply py-3 px-5;
}
</style>
