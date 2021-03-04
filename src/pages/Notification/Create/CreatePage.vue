<template>
  <Card class="form">
    <NotificationForm
      :isFetching="requestStatus.fetch"
      @submit="handleSubmit"
    />
  </Card>
</template>
<script>
/* eslint-disable */
import { computed, onMounted, reactive, ref, unref } from 'vue';
import { useStore } from 'vuex';
import Card from '@common/Card';
import NotificationForm from '@fragment/Notification/ActionForm';

export default {
  components: {
    Card,
    NotificationForm,
  },
  setup() {
    const store = useStore();

    const requestStatus = computed(() => {
      return store.getters['notification/getRequestStatus'];
    });

    const handleSubmit = data => {
      store.dispatch('notification/postData', {
        action: 'form.create',
        redirectUrl: '/notification',
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
