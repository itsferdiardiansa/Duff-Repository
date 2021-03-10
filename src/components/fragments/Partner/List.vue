<template>
  <div class="list">
    <Modal
      title="Delete confirmation"
      description="Are you sure you want to delete this item?"
      :onConfirmFn="deleteData"
    />

    <div class="list--header">
      <Button
        label="Create Footer"
        variant="primary"
        :bold="true"
        :icon="['fa', 'plus']"
        @click="createPartner"
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
      <template #status="{ data: { is_active } }">
        <div class="status">
          <Badge
            size="xs"
            :bold="true"
            :variant="parseInt(is_active) ? 'success' : 'danger'"
            :dot="true"
            :pill="true"
          />
          <span class="ml-2">{{
            parseInt(is_active) ? 'active' : 'inactive'
          }}</span>
        </div>
      </template>

      <template #logo="{ data }">
        <img :src="data.logo" class="h-10 inline-block" />
      </template>

      <template #order="{ data }">
        <OrderButton :data="data" />
      </template>

      <template #action="{ data }">
        <ActionButton :data="actionButtons" :item="data" />
      </template>
    </Table>
  </div>
</template>
<script>
import { onMounted, computed, ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import Table, { ActionButton } from '@common/Table';
import Badge from '@common/Badge';
import Button from '@common/Button';
import Modal from '@common/Modal';
import EmptyData from './EmptyData';
import OrderButton from './OrderButton';

export default {
  components: {
    Table,
    Badge,
    Button,
    Modal,
    ActionButton,
    OrderButton,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const params = reactive({ page: 1, limit: 5 });
    const tHeaders = ref([
      {
        title: 'Partner Name',
        accessor: 'description',
        width: '20%',
        align: 'center',
      },
      { title: 'Icon', accessor: 'logo' },
      { title: 'Tagline', accessor: 'tagline' },
      { title: 'Order', accessor: 'order', width: '10%', align: 'center' },
      { title: 'Status', accessor: 'status', width: '10%', align: 'center' },
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
            name: 'Update Partner',
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
    ]);

    const toggleModal = (e, data) => {
      $modal.show(data);
    };

    const fetchData = () => {
      store.dispatch('partner/fetchData', params);
    };

    const pagination = computed(() => {
      return store.getters['partner/getPagination'];
    });

    const filteredData = computed(() => {
      return store.getters['partner/getItems'];
    });

    const requestStatus = computed(() => {
      return store.getters['partner/getRequestStatus'];
    });

    const emptyDataComponent = computed(() => EmptyData);

    const deleteData = ({ hash_id }) => {
      store.dispatch('partner/deleteData', {
        action: 'form.delete',
        message: 'Succesfully delete',
        status: 'success',
        hash_id,
        params,
      });
    };

    const handlePageChange = pageParams => {
      Object.assign(params, pageParams);

      fetchData();
    };

    const createPartner = () => {
      router.push('/partner/create');
    };

    const getPath = path => '/e/' + path;

    onMounted(fetchData);

    return {
      requestStatus,
      pagination,
      filteredData,
      fetchData,
      tHeaders,
      emptyDataComponent,
      createPartner,
      getPath,
      actionButtons,
      deleteData,
      handlePageChange,
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
