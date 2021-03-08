<template>
  <Card class="form">
    <ThematicForm
      :data="formData"
      :isFetching="requestStatus.fetch"
      :isCreate="false"
      @submit="handleSubmit"
    />
  </Card>
</template>
<script>
/* eslint-disable */
import { reactive, ref, computed, unref, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import Card from '@common/Card';
import ThematicForm from '@fragment/Thematic/ActionForm';

export default {
  components: {
    Card,
    ThematicForm,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const formData = reactive({});

    const requestStatus = computed(() => {
      return store.getters['thematicPage/getRequestStatus'];
    });

    const handleSubmit = data => {
      store.dispatch('thematicPage/updateData', {
        action: 'form.create',
        redirectUrl: '/thematic-page',
        data,
      });
    };

    onMounted(() => {
      const {
        params: { data },
      } = route;

      if (data) {
        Object.assign(formData, JSON.parse(data));
      } else router.push('/thematic-page');
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
