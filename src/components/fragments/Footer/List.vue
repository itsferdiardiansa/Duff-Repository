<template>
  <div class="list">
    <div class="list--header">
      <Button
        label="Create Partner"
        variant="primary"
        :bold="true"
        :icon="['fa', 'plus']"
        @click="createFooter"
      />
    </div>

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
    </Table>

    <Modal
      title="Delete confirmation"
      description="Are you sure you want to delete this item?"
      :onConfirmFn="deleteData"
    />
  </div>
</template>
<script>
import { computed, onMounted, reactive, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
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
    const router = useRouter();
    const params = reactive({ page: 1, limit: 5 });

    const tHeaders = ref([
      {
        title: 'Section Name',
        accessor: 'name',
        width: '20%',
        align: 'center',
      },
      { title: 'Position', accessor: 'position' },
      { title: 'Updated At', accessor: 'updated_at' },
      { title: 'Created At', accessor: 'created_at' },
      {
        title: 'Action',
        accessor: 'action',
        colSpan: 3,
        width: '25%',
        align: 'center',
      },
    ]);

    const actionButtons = ref([
      {
        icon: ['fa', 'pencil-alt'],
        variant: 'dark',
        onClickFn: (e, data) => {
          router.push({
            name: 'Update Footer',
            params: { data: JSON.stringify(data) },
          });
        },
      },
      {
        icon: ['fa', 'trash'],
        variant: 'dark',
        onClickFn: (e, data) => {
          toggleModal(e, data);
        },
      },
      {
        icon: ['fa', 'plus'],
        text: 'Add Menu',
        bold: true,
        variant: 'dark',
        onClickFn: (e, { hash_id }) => {
          router.push({
            name: 'Footer Detail List',
            query: { hash_id },
            params: { hash_id },
          });
        },
      },
    ]);

    const toggleModal = (e, data) => {
      self.$modal.show(data);
    };

    const fetchData = () => {
      store.dispatch('footer/fetchData', params);
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

    const deleteData = ({ hash_id }) => {
      store.dispatch('footer/deleteData', {
        action: 'form.delete',
        status: 'success',
        hash_id,
        params,
      });
    };

    const getPosition = position => {
      return store.getters['footer/getPositionByID'](position)?.label || null;
    };

    const createFooter = () => {
      router.push('/footer/create');
    };

    const handlePageChange = pageParams => {
      Object.assign(params, pageParams);

      fetchData();
    };

    onMounted(fetchData);

    return {
      fetchData,
      requestStatus,
      filteredData,
      tHeaders,
      actionButtons,
      getPosition,
      deleteData,
      createFooter,
      handlePageChange,
      pagination,
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
