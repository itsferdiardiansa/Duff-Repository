<template>
  <div class="list">
    <Table
      :headers="tHeaders"
      :items="filteredData"
      :isFetching="requestStatus.fetch"
      :onError="requestStatus.error.status"
      :onFailedFetchHandler="fetchData"
      :pagination="pagination"
      :onPageChange="handlePageChange"
    >
      <template #position="{ data }">
        <p v-text="getPosition(data.position)"></p>
      </template>

      <template #action="{ data }">
        <ActionButton :data="actionButtons" :item="data" />
      </template>

      <template #filter>
        <Button
          label="Create Footer Menu"
          variant="orange"
          :bold="true"
          :icon="['fa', 'plus']"
          @click="createFooter"
        />
      </template>
    </Table>

    <Modal
      title="Delete confirmation"
      description="Are you sure you want to delete this item?"
    />
  </div>
</template>
<script>
import { computed, onMounted, reactive, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useStore } from 'vuex';
import Table, { ActionButton } from '@common/Table';
import Modal from '@common/Modal';
import Button from '@common/Button';

export default {
  components: {
    Table,
    ActionButton,
    Modal,
    Button,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const params = reactive({ page: 1, limit: 5 });
    const state = reactive({
      hash_id: null,
    });

    const tHeaders = ref([
      {
        title: 'Section Name',
        accessor: 'name',
        width: '20%',
        align: 'left',
      },
      { title: 'Link', accessor: 'link', align: 'left' },
      { title: 'Position', accessor: 'position' },
      { title: 'Updated At', accessor: 'updated_at' },
      { title: 'Created At', accessor: 'created_at' },
      {
        accessor: 'action',
        colSpan: 3,
        width: '10%',
        align: 'center',
      },
    ]);

    const actionButtons = ref([
      {
        text: 'Edit',
        icon: ['fa', 'pencil-alt'],
        variant: 'dark',
        onClickFn: (e, data) => {
          router.push({
            name: 'Update Footer Detail',
            params: { menu_id: state.hash_id, data: JSON.stringify(data) },
          });
        },
      },
    ]);

    const fetchData = () => {
      store.dispatch('footer/fetchMenuList', { ...state, pagination: params });
    };

    const pagination = computed(() => {
      return store.getters['footer/getPagination'];
    });

    const filteredData = computed(() => {
      return store.getters['footer/getItems'];
    });

    const requestStatus = computed(() => {
      return store.getters['footer/getRequestStatus'];
    });

    const getPosition = position => {
      return store.getters['footer/getPositionByID'](position)?.label || null;
    };

    const createFooter = () => {
      router.push({
        name: 'Create Footer Detail',
        query: { hash_id: state.hash_id },
      });
    };

    const handlePageChange = pageParams => {
      Object.assign(params, pageParams);

      fetchData();
    };

    onMounted(() => {
      const hash_id = route.query?.hash_id;

      if (!hash_id) router.push('/footer');
      else {
        state.hash_id = hash_id;

        fetchData();
      }
    });

    return {
      fetchData,
      requestStatus,
      filteredData,
      tHeaders,
      actionButtons,
      getPosition,
      pagination,
      handlePageChange,
      createFooter,
    };
  },
};
</script>
<style lang="scss" scoped>
.list {
  &--header {
    @apply py-6 flex justify-end items-center;
  }

  .status {
    @apply flex items-center justify-center;
  }
}
</style>
