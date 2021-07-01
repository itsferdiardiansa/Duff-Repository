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
      <template #page_info="{ data }">
        <div class="text-left">
          <h3 class="font-bold" v-text="data.header_text"></h3>
          <p v-text="data.description_text"></p>
        </div>
      </template>

      <template #action="{ data }">
        <ActionButton :data="actionButtons" :item="data" />
      </template>

      <template #created_at="{ data: { created_at } }">
        {{ $util.formatDateTime(created_at, 'DD MMM YYYY hh:mm WIB') }}
      </template>

      <template #filter>
        <Button
          label="Create Thematic Page"
          variant="orange"
          :bold="true"
          :icon="['fa', 'plus']"
          @click="createThematicPage"
        />
      </template>
    </Table>
  </div>
</template>
<script>
/* eslint-disable */
import { onMounted, computed, ref, unref, reactive } from 'vue';
import { useRouter } from 'vue-router';
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
    const params = reactive({ page: 1, limit: 10 });

    const tHeaders = ref([
      {
        title: 'Banner',
        accessor: 'header_image',
        width: '10%',
        type: 'image',
      },
      {
        title: 'Banner Mobile',
        accessor: 'header_image_mobile',
        width: '10%',
        align: 'center',
        type: 'image',
      },
      {
        title: 'Thematic Name',
        accessor: 'name',
        width: '15%',
        align: 'center',
      },
      { title: 'Page Info', accessor: 'meta_title' },
      { title: 'Path', accessor: 'path', width: '11%', align: 'center' },
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
            name: 'Update Thematic Page',
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
      {
        text: 'Add Event',
        icon: ['fa', 'plus'],
        variant: 'dark',
        onClickFn: (e, data) => {
          router.push({
            name: 'Event Thematic Page',
            params: {
              thematicHashId: data.hash_id,
            },
          });
        },
      },
    ]);

    const fetchData = () => {
      store.dispatch('thematicPage/fetchData', params);
    };

    const pagination = computed(() => {
      return store.getters['thematicPage/getPagination'];
    });

    const deleteData = ({ hash_id }) => {
      store.dispatch('thematicPage/deleteData', {
        action: 'form.delete',
        hash_id,
        params,
      });
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

    const createThematicPage = () => {
      router.push('/thematic-page/create');
    };

    const getPath = path => '/e/' + path;

    const handlePageChange = pageParams => {
      Object.assign(params, pageParams);

      fetchData();
    };

    onMounted(fetchData);

    return {
      requestStatus,
      filteredData,
      fetchData,
      tHeaders,
      emptyDataComponent,
      createThematicPage,
      getPath,
      actionButtons,
      deleteData,
      pagination,
      handlePageChange,
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
