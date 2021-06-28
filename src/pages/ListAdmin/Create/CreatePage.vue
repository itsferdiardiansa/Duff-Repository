<template>
  <Card class="form">
    <AdminForm
      :data="formData"
      :isFetching="requestStatus.fetch"
      @submit="handleSubmit"
    />
  </Card>
</template>
<script>
/* eslint-disable */
import { computed, onMounted, reactive } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import Card from '@common/Card';
import AdminForm from '@fragment/ListAdmin/ActionForm';

export default {
  components: {
    Card,
    AdminForm,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const formData = reactive({});

    const requestStatus = computed(() => {
      return store.getters['admin/getRequestStatus'];
    });

    const handleSubmit = data => {
      store.dispatch('admin/postData', {
        action: 'form.create',
        redirectUrl: '/list-admin',
        data,
      });
    };

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
