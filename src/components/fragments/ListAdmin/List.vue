<template>
  <div class="list">
    <Modal
      title="Delete confirmation"
      description="Are you sure you want to delete this item?"
      :onConfirmFn="deleteData"
    />

    <Table
      :headers="tHeaders"
      :items="filteredData"
      :isFetching="requestStatus.fetch"
      :onError="requestStatus.error.status"
      :onFailedFetchHandler="fetchData"
      :pagination="pagination"
      :onPageChange="handlePageChange"
    >
      <template #adminAccess="{ data: { is_super_admin } }">
        <Badge :variant="getVariant(is_super_admin)">
          {{ is_super_admin ? 'inactive' : 'active' }}
        </Badge>
      </template>

      <template #action="{ data }">
        <ActionButton :data="actionButtons" :item="data" />
      </template>
    </Table>
  </div>
</template>
<script>
import { computed, onMounted, reactive, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import Table, { ActionButton } from '@common/Table';
import Badge from '@common/Badge';
import Modal from '@common/Modal';

export default {
  components: {
    Table,
    Badge,
    ActionButton,
    Modal,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const params = reactive({ page: 1, limit: 5 });

    let tHeaders = ref([
      {
        title: 'Role Name',
        accessor: 'name',
        width: '20%',
        align: 'left',
      },
      { title: 'Email', accessor: 'email' },
      { title: 'Admin Access', accessor: 'adminAccess' },
      { title: 'Created at', accessor: 'created_at' },
      {
        title: 'Action',
        accessor: 'action',
        colSpan: 1,
        align: 'center',
      },
    ]);

    const actionButtons = ref([
      {
        icon: ['fa', 'pencil-alt'],
        variant: 'dark',
        onClickFn: (e, data) => {
          router.push({
            name: 'Update Admin',
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
      self.$modal.show(data);
    };

    const deleteData = ({ hash_id }) => {
      store.dispatch('admin/deleteData', {
        action: 'form.delete',
        hash_id,
        params,
      });
    };

    const fetchData = () => {
      store.dispatch('admin/fetchData', params);
    };

    const filteredData = computed(() => {
      return store.getters['admin/getItems'];
    });

    const pagination = computed(() => {
      return store.getters['admin/getPagination'];
    });

    const requestStatus = computed(() => {
      return store.getters['admin/getRequestStatus'];
    });

    const getVariant = status => (!status ? 'primary' : 'danger');

    const handlePageChange = pageParams => {
      Object.assign(params, pageParams);

      fetchData();
    };

    onMounted(fetchData);

    return {
      requestStatus,
      filteredData,
      tHeaders,
      getVariant,
      fetchData,
      deleteData,
      actionButtons,
      toggleModal,
      pagination,
      handlePageChange,
    };
  },
};
</script>
<style lang="scss" scoped>
.content-container {
  @apply relative;

  .wrapper {
    @apply relative;
  }
}
</style>
