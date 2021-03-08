<template>
  <Card class="form">
    <ThematicForm :isFetching="requestStatus.fetch" @submit="handleSubmit" />
  </Card>
</template>
<script>
/* eslint-disable */
import { reactive, ref, computed, unref, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
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

    const requestStatus = computed(() => {
      return store.getters['thematicPage/getRequestStatus'];
    });

    const handleSubmit = data => {
      store.dispatch('thematicPage/postData', {
        action: 'form.create',
        redirectUrl: '/thematic-page',
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
