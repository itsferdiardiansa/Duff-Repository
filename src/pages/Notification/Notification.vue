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
import ContentHeader from '@fragment/Notification/Header';
import ContentList from '@fragment/Notification/List';

export default {
  components: {
    ContentWrapper,
    ContentHeader,
    ContentList,
  },
};
</script>
