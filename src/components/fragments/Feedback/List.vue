<template>
  <div class="list">
    <Table
      :headers="tHeaders"
      :items="filteredData"
      :isFetching="requestStatus.fetch"
      :onError="requestStatus.error.status"
      :pagination="pagination"
      :onPageChange="handlePageChange"
      :onFailedFetchHandler="fetchData"
    >
      <template #read_by_slice="{ data }">
        <div @click="openReadBy(data.read_by)">See</div>
      </template>

      <template #responded_by="{ data }">
        <Badge variant="primary" :label="data.responded_by" />
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
import Table, { ActionButton } from '@common/Table';
import Badge from '@common/Badge';

export default {
  components: {
    Table,
    Badge,
    ActionButton,
  },
  setup() {
    const store = useStore();
    const params = reactive({ page: 1, limit: 5 });

    const tHeaders = ref([
      {
        title: 'Email',
        accessor: 'email',
        width: '15%',
        align: 'left',
      },
      { title: 'Name', accessor: 'name', width: '15%' },
      { title: 'Page', accessor: 'page' },
      { title: 'Section', accessor: 'section' },
      { title: 'Responded by', accessor: 'responded_by' },
      { title: 'Read by', accessor: 'read_by_slice' },
      {
        title: 'Action',
        accessor: 'action',
        colSpan: 1,
        align: 'center',
      },
    ]);

    const actionButtons = reactive([
      {
        variant: 'dark',
        icon: ['fa', 'marker'],
        text: 'Mark as responded',
        bold: true,
        onClickFn: (e, data) => {
          markAsResponded(e, data);
        },
      },
      {
        variant: 'dark',
        icon: ['fa', 'bookmark'],
        text: 'Mark as read',
        inverse: true,
        bold: true,
        onClickFn: (e, data) => {
          markAsRead(e, data);
        },
      },
    ]);

    const openReadBy = data => {
      const items = JSON.parse(data);

      SSModal.show({
        footer: false,
        title: 'Read By',
        content: () => (
          <div class="read-by-col">
            {items.length ? (
              items.map(item => <Badge variant="primary" label={item} />)
            ) : (
              <span class="empty-label">Empty</span>
            )}
          </div>
        ),
      });
    };

    const fetchData = () => {
      store.dispatch('feedback/fetchData', params);
    };

    const markAsResponded = (e, data) => {
      store.dispatch('feedback/markAsResponded', {
        action: 'form.create',
        data,
        params,
      });
    };

    const markAsRead = (e, data) => {
      store.dispatch('feedback/markAsRead', {
        action: 'form.create',
        data,
        params,
      });
    };

    const filteredData = computed(() => {
      return store.getters['feedback/getItems'];
    });

    const pagination = computed(() => {
      return store.getters['feedback/getPagination'];
    });

    const requestStatus = computed(() => {
      return store.getters['feedback/getRequestStatus'];
    });

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
      pagination,
      handlePageChange,
      openReadBy,
    };
  },
};
</script>
<style lang="scss">
.list {
  @apply relative;

  .wrapper {
    @apply relative;
  }
}

.read-by-col {
  @apply grid grid-cols-6 gap-2 overflow-y-scroll;
  max-height: 200px;

  .empty-label {
    @apply italic font-thin text-sm;
  }
}
</style>
