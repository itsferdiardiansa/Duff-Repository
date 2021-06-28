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
      <template #adminAccess="{ data: { is_super_admin } }">
        <Badge :variant="getVariant(is_super_admin)">
          {{ is_super_admin ? 'inactive' : 'active' }}
        </Badge>
      </template>

      <template #created_at="{ data: { created_at } }">
        {{ $util.formatDateTime(created_at, 'DD MMMM YYYY hh:mm WIB') }}
      </template>

      <template #action="{ data }">
        <ActionButton :data="actionButtons" :item="data" />
      </template>

      <template #filter>
        <Button
          variant="orange"
          :icon="['fa', 'plus']"
          :bold="true"
          @click="addAdmin"
        >
          Add Admin
        </Button>
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
import Button from '@common/Button';

export default {
  components: {
    Table,
    Badge,
    ActionButton,
    Button,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const params = reactive({ page: 1, limit: 10 });

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
        accessor: 'action',
        colSpan: 1,
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
            name: 'Update Admin',
            params: { data: JSON.stringify(data) },
          });
        },
      },
      {
        text: 'Delete',
        icon: ['fa', 'trash'],
        variant: 'dark',
        onClickFn: (e, data) => {
          SSModal.show({
            title: 'Delete confirmation',
            content: 'Are you sure you want to delete this item?',
            onConfirmFn: () => deleteData(data),
          });
        },
      },
    ]);

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

    const addAdmin = () => {
      router.push('/list-admin/create');
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
      pagination,
      handlePageChange,
      addAdmin,
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
