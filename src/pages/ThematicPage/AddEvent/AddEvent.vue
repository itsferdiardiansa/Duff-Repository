<template>
  <ContentWrapper>
    <ContentEventList />
  </ContentWrapper>
</template>
<script>
import ContentWrapper from '@base/Content/ContentWrapper';
import ContentEventList from '@fragment/Thematic/EventList';

export default {
  components: {
    ContentWrapper,
    ContentEventList,
  },
};
</script>
