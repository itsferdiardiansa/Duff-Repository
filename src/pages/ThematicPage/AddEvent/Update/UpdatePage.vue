<template>
  <Card class="form">
    <EventForm
      :data="formData"
      :isFetching="requestStatus.fetch"
      :isCreate="false"
      @submit="handleSubmit"
    />
  </Card>
</template>
<script>
/* eslint-disable */
import { reactive, ref, computed, unref, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
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
    const router = useRouter();
    const formData = reactive({});

    const requestStatus = computed(() => {
      return store.getters['thematicPage/getRequestStatus'];
    });

    const handleSubmit = data => {
      const { thematicHashId, eventHashId } = route.params;

      store.dispatch('thematicPage/updateEventData', {
        action: 'form.create',
        redirectUrl: `/thematic-page/event/${thematicHashId}`,
        thematicHashId,
        eventHashId,
        data,
      });
    };

    onMounted(() => {
      const {
        params: { data, thematicHashId },
      } = route;

      if (data) {
        Object.assign(formData, JSON.parse(data));
      } else router.push(`/thematic-page/event/${thematicHashId}`);
    });

    return {
      formData,
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
