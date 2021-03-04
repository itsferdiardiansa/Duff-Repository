<template>
  <Card class="form">
    <NotificationForm
      :data="formData"
      :isFetching="requestStatus.fetch"
      :isCreate="false"
      @submit="handleSubmit"
    />
  </Card>
</template>
<script>
/* eslint-disable */
import { computed, onMounted, reactive, ref, unref } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import Card from '@common/Card';
import NotificationForm from '@fragment/Notification/ActionForm';

export default {
  components: {
    Card,
    NotificationForm,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const formData = reactive({});

    const requestStatus = computed(() => {
      return store.getters['notification/getRequestStatus'];
    });

    const handleSubmit = data => {
      store.dispatch('notification/updateData', {
        action: 'form.create',
        redirectUrl: '/notification',
        data,
      });
    };

    onMounted(() => {
      const {
        params: { data },
      } = route;

      if (data) {
        Object.assign(formData, JSON.parse(data));
      } else router.push('/notification');
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
