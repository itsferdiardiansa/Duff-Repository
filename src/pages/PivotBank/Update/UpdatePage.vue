<template>
  <Card class="form">
    <HeroForm
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
import HeroForm from '@fragment/PivotBank/ActionForm';

export default {
  components: {
    Card,
    HeroForm,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const formData = reactive({});

    const requestStatus = computed(() => {
      return store.getters['pivotBank/getRequestStatus'];
    });

    const handleSubmit = data => {
      store.dispatch('pivotBank/updateData', {
        action: 'form.update',
        redirectUrl: '/pivot-bank',
        data,
      });
    };

    onMounted(() => {
      const {
        params: { data },
      } = route;

      if (data) {
        Object.assign(formData, JSON.parse(data));
      } else router.push('/pivot-bank');
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
