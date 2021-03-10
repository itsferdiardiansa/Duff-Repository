<template>
  <Card class="form">
    <FooterForm
      :data="formData"
      :isCreate="false"
      :isFetching="requestStatus.fetch"
      @submit="handleSubmit"
    />
  </Card>
</template>
<script>
/* eslint-disable */
import { computed, onMounted, reactive, ref, unref } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import Card from '@common/Card';
import FooterForm from '@fragment/Footer/ActionFormMenu';

export default {
  components: {
    Card,
    FooterForm,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const hash_id = ref('');
    const formData = reactive({});

    const requestStatus = computed(() => {
      return store.getters['footer/getRequestStatus'];
    });

    const handleSubmit = data => {
      store.dispatch('footer/updateMenuData', {
        action: 'form.update',
        redirectUrl: `/footer/list?hash_id=${unref(hash_id)}`,
        hash_id: unref(hash_id),
        data,
      });
    };

    onMounted(() => {
      const { menu_id, data } = route.params;

      if (!menu_id) router.push(`/footer/list`);
      else {
        hash_id.value = menu_id;
        Object.assign(formData, JSON.parse(data));
      }
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
