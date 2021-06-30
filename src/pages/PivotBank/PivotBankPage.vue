<template>
  <ContentWrapper>
    <PivotBankList />
  </ContentWrapper>
</template>
<script>
/* eslint-disable */
import ContentWrapper from '@base/Content/ContentWrapper';
import PivotBankList from '@fragment/PivotBank/List';

export default {
  components: {
    ContentWrapper,
    PivotBankList,
  },
  setup() {},
};
</script>
<style lang="scss" scoped>
.wrapper {
  @apply py-3 px-5;
}
</style>
