<template>
  <Card class="form">
    <RoleForm :isFetching="requestStatus.fetch" @submit="handleSubmit" />
  </Card>
</template>
<script>
/* eslint-disable */
import { computed } from 'vue';
import { useStore } from 'vuex';
import Card from '@common/Card';
import RoleForm from '@fragment/Role/ActionForm';

export default {
  components: {
    Card,
    RoleForm,
  },
  setup() {
    const store = useStore();

    const requestStatus = computed(() => {
      return store.getters['role/getRequestStatus'];
    });

    const handleSubmit = data => {
      store.dispatch('role/postData', {
        action: 'form.create',
        redirectUrl: '/role',
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
