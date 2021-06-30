<template>
  <div class="list">
    <Table
      :headers="tHeaders"
      :items="filteredData"
      :isFetching="requestStatus.fetch"
      :onError="requestStatus.error.status"
      :onFailedFetchHandler="fetchEventData"
      :pagination="pagination"
      :onPageChange="handlePageChange"
    >
      <template #position="{ data: { position } }">
        {{ getEventPosition(position) }}
      </template>

      <template #action="{ data }">
        <ActionButton :data="actionButtons" :item="data" />
      </template>

      <template #created_at="{ data: { created_at } }">
        {{ $util.formatDateTime(created_at, 'DD MMMM YYYY hh:mm WIB') }}
      </template>

      <template #filter>
        <Button
          label="Add Event"
          variant="orange"
          :bold="true"
          :icon="['fa', 'plus']"
          @click="addEvent"
        />
      </template>
    </Table>
  </div>
</template>
<script>
/* eslint-disable */
import { onMounted, computed, ref, unref, reactive } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useStore } from 'vuex';
import Table, { ActionButton } from '@common/Table';
import { ErrorTable, EmptyTable } from '@common/Table';
import Button from '@common/Button';

export default {
  components: {
    Table,
    Button,
    ActionButton,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const routes = useRoute();
    const params = reactive({ page: 1, limit: 10 });
    const thematicHashId = ref();

    const tHeaders = ref([
      { title: 'Position', accessor: 'position', width: '10%' },
      { title: 'Created At', accessor: 'created_at', align: 'center' },
      { accessor: 'action', align: 'center' },
    ]);

    const actionButtons = ref([
      {
        text: 'Edit',
        icon: ['fa', 'pencil-alt'],
        variant: 'dark',
        onClickFn: (e, data) => {
          router.push({
            name: 'Update Event Thematic Page',
            params: {
              data: JSON.stringify(data),
              eventHashId: data.hash_id,
            },
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

    const fetchEventData = () => {
      store.dispatch('thematicPage/fetchEventListData', {
        thematicHashId: unref(thematicHashId),
        ...params,
      });
    };

    const pagination = computed(() => {
      return store.getters['thematicPage/getPagination'];
    });

    const deleteData = ({ hash_id }) => {
      store.dispatch('thematicPage/deleteEventData', {
        action: 'form.delete',
        eventHashId: hash_id,
        thematicHashId: unref(thematicHashId),
        params,
      });
    };

    const getEventPosition = id => {
      const position = store.getters['thematicPage/getPosition'];

      return position?.find(item => item.value == id)?.label || 'Unknown';
    };

    const filteredData = computed(() => {
      return store.getters['thematicPage/getItems'];
    });

    const requestStatus = computed(() => {
      return store.getters['thematicPage/getRequestStatus'];
    });

    const emptyDataComponent = computed(() => {
      const request = unref(requestStatus);

      return request.error.status ? ErrorTable : EmptyTable;
    });

    const addEvent = () => {
      router.push({ name: 'Create Event Thematic Page' });
    };

    const getPath = path => '/e/' + path;

    const handlePageChange = pageParams => {
      Object.assign(params, pageParams);

      fetchEventData(unref(thematicHashId));
    };

    onMounted(() => {
      thematicHashId.value = routes.params?.thematicHashId;

      fetchEventData(unref(thematicHashId));
    });

    return {
      requestStatus,
      filteredData,
      fetchEventData,
      tHeaders,
      emptyDataComponent,
      addEvent,
      getPath,
      actionButtons,
      deleteData,
      pagination,
      handlePageChange,
      getEventPosition,
    };
  },
};
</script>
<style lang="scss" scoped>
.list {
  @apply relative;

  .wrapper {
    @apply py-6 align-middle inline-block min-w-full shadow overflow-hidden bg-gray-50 px-8 pt-3 rounded-bl-lg rounded-br-lg;
  }
}
</style>
