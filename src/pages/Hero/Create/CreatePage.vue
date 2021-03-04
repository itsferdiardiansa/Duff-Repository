<template>
  <Card class="form">
    <HeroForm :isFetching="requestStatus.fetch" @submit="handleSubmit" />
  </Card>
</template>
<script>
/* eslint-disable */
import { computed } from 'vue';
import { useStore } from 'vuex';
import Card from '@common/Card';
import HeroForm from '@fragment/Hero/ActionForm';

export default {
  components: {
    Card,
    HeroForm,
  },
  setup() {
    const store = useStore();

    const requestStatus = computed(() => {
      return store.getters['hero/getRequestStatus'];
    });

    const handleSubmit = data => {
      store.dispatch('hero/postData', {
        action: 'form.create',
        redirectUrl: '/hero',
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
