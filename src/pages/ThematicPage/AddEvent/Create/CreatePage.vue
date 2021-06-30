<template>
  <Card class="form">
    <EventForm :isFetching="requestStatus.fetch" @submit="handleSubmit" />
  </Card>
</template>
<script>
/* eslint-disable */
import { reactive, ref, computed, unref, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import Card from '@common/Card';
import EventForm from '@fragment/Thematic/EventForm';

export default {
  components: {
    Card,
    EventForm,
  },
  setup() {
    const store = useStore();
    const route = useRoute();

    const requestStatus = computed(() => {
      return store.getters['thematicPage/getRequestStatus'];
    });

    const handleSubmit = data => {
      const thematicHashId = route.params?.thematicHashId;

      store.dispatch('thematicPage/postEventData', {
        action: 'form.create',
        redirectUrl: `/thematic-page/event/${thematicHashId}`,
        thematicHashId,
        data,
      });
    };

    return {
      handleSubmit,
      requestStatus,
    };
  },
};
</script>
<style lang="scss" scoped>
.form {
  @apply w-full p-6;
}
</style>
