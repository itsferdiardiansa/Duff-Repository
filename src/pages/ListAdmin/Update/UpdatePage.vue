<template>
  <Card class="form">
    <AdminForm
      :data="formData"
      :isFetching="requestStatus.fetch"
      :isCreate="false"
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
      return store.getters['hero/getRequestStatus'];
    });

    const handleSubmit = data => {
      store.dispatch('hero/updateData', {
        action: 'form.create',
        redirectUrl: '/list-admin',
        data,
      });
    };

    onMounted(() => {
      const {
        params: { data },
      } = route;

      if (data) {
        Object.assign(formData, JSON.parse(data));
      } else router.push('/list-admin');
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
