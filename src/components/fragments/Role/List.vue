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
      @onSearch="handleSearch"
    >
      <template #previlage="{ data: { privileges } }">
        <div class="previlage-col">
          <Button
            label="See privilege"
            size="xs"
            variant="primary"
            @click="handlePreviewPrivilages(privileges)"
          />
        </div>
      </template>

      <template #action="{ data }">
        <ActionButton :data="actionButtons" :item="data" />
      </template>

      <template #created_at="{ data: { created_at } }">
        {{ $util.formatDateTime(created_at, 'DD MMMM YYYY hh:mm WIB') }}
      </template>

      <template #updated_at="{ data: { updated_at } }">
        {{ $util.formatDateTime(updated_at, 'DD MMMM YYYY hh:mm WIB') }}
      </template>

      <template #filter>
        <Button
          variant="orange"
          label="Add Role"
          :icon="['fa', 'plus']"
          :bold="true"
          @click="addRole"
        />
      </template>
    </Table>
  </div>
</template>
<script>
/* eslint-disable */
import { computed, onMounted, reactive, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import Table, {
  EmptyTable as emptyComponent,
  ActionButton,
} from '@common/Table';
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

    const tHeaders = ref([
      {
        title: 'Role Name',
        accessor: 'name',
        width: '20%',
      },
      { title: 'Privilage', accessor: 'previlage' },
      { title: 'Created at', accessor: 'created_at' },
      { title: 'Updated at', accessor: 'updated_at' },
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
            name: 'Update Role',
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

    const handlePreviewPrivilages = privileges => {
      SSModal.show({
        footer: false,
        content: () => (
          <>
            {privileges.map(item => (
              <Badge variant="primary" class="mr-2">
                {item.name}
              </Badge>
            ))}
          </>
        ),
      });
    };

    const handlePageChange = pageParams => {
      Object.assign(params, pageParams);

      fetchData();
    };

    const addRole = () => {
      router.push('/role/create');
    };

    onMounted(fetchData);

    const handleSearch = params => {
      console.log(params);
    };

    return {
      requestStatus,
      filteredData,
      tHeaders,
      fetchData,
      deleteData,
      emptyComponent,
      actionButtons,
      pagination,
      handlePageChange,
      handlePreviewPrivilages,
      addRole,
      handleSearch,
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
