<template>
  <ContentWrapper>
    <template #header>
      <ContentHeader />
    </template>

    <ContentList />
  </ContentWrapper>
</template>
<script>
import ContentWrapper from '@base/Content/ContentWrapper';
import ContentHeader from '@fragment/ListAdmin/Header';
import ContentList from '@fragment/ListAdmin/List';

export default {
  components: {
    ContentWrapper,
    ContentHeader,
    ContentList,
  },
};
</script>
