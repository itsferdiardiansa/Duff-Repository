<template>
  <Card class="form">
    <FooterForm :isFetching="requestStatus.fetch" @submit="handleSubmit" />
  </Card>
</template>
<script>
/* eslint-disable */
import { computed, onMounted, reactive, ref, unref } from 'vue';
import { useStore } from 'vuex';
import Card from '@common/Card';
import FooterForm from '@fragment/Footer/ActionForm';

export default {
  components: {
    Card,
    FooterForm,
  },
  setup() {
    const store = useStore();

    const requestStatus = computed(() => {
      return store.getters['footer/getRequestStatus'];
    });

    const handleSubmit = data => {
      store.dispatch('footer/postData', {
        action: 'form.create',
        redirectUrl: '/footer',
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
