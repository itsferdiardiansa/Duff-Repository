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
      <template #previlage="{ data }">
        <div class="previlage-col">
          <template v-for="(item, key) in data.previlege" :key="key">
            <Badge variant="primary" :inverse="true" class="mr-2">
              {{ item.id_privilege }}
            </Badge>
          </template>
        </div>
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
import Table, {
  EmptyTable as emptyComponent,
  ActionButton,
} from '@common/Table';
import Badge from '@common/Badge';
import Modal from '@common/Modal';
import { useRouter } from 'vue-router';

export default {
  components: {
    Table,
    Badge,
    Modal,
    ActionButton,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const params = reactive({ page: 1, limit: 5 });

    const tHeaders = ref([
      {
        title: 'Role Name',
        accessor: 'name',
        width: '20%',
      },
      { title: 'Previlage', accessor: 'previlage' },
      { title: 'Created at', accessor: 'created_at' },
      { title: 'Updated at', accessor: 'updated_at' },
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
            name: 'Update Role',
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
      store.dispatch('role/deleteData', {
        action: 'form.delete',
        hash_id,
        params,
      });
    };

    const fetchData = () => {
      store.dispatch('role/fetchData', params);
    };

    const filteredData = computed(() => {
      return store.getters['role/getItems'];
    });

    const pagination = computed(() => {
      return store.getters['role/getPagination'];
    });

    const requestStatus = computed(() => {
      return store.getters['role/getRequestStatus'];
    });

    const handlePageChange = pageParams => {
      Object.assign(params, pageParams);

      fetchData();
    };

    onMounted(fetchData);

    return {
      requestStatus,
      filteredData,
      tHeaders,
      fetchData,
      deleteData,
      emptyComponent,
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

  .previlage-col {
    @apply flex justify-center;
  }
}
</style>
