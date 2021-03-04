<template>
  <Card class="form">
    <RoleForm
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
import RoleForm from '@fragment/Role/ActionForm';

export default {
  components: {
    Card,
    RoleForm,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const formData = reactive({});

    const requestStatus = computed(() => {
      return store.getters['role/getRequestStatus'];
    });

    const handleSubmit = data => {
      store.dispatch('role/updateData', {
        action: 'form.create',
        redirectUrl: '/role',
        data,
      });
    };

    onMounted(() => {
      const {
        params: { data },
      } = route;

      if (data) {
        Object.assign(formData, JSON.parse(data));
      } else router.push('/role');
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
