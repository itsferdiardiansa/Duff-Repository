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
import HeroForm from '@fragment/PivotBank/ActionForm';

export default {
  components: {
    Card,
    HeroForm,
  },
  setup() {
    const store = useStore();

    const requestStatus = computed(() => {
      return store.getters['pivotBank/getRequestStatus'];
    });

    const handleSubmit = data => {
      store.dispatch('pivotBank/postData', {
        action: 'form.create',
        redirectUrl: '/pivot-bank',
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
