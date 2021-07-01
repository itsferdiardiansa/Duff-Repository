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
      @onSearchCallback="handleSearchCallback"
    >
      <template #url="{ data }">
        <a :href="data.button_url" target="_blank">{{ data.button_url }}</a>
      </template>

      <template #action="{ data }">
        <ActionButton :data="actionButtons" :item="data" />
      </template>

      <template #filter>
        <Button
          variant="orange"
          :bold="true"
          :icon="['fa', 'plus']"
          @click="createHero"
        >
          Create Hero
        </Button>
      </template>
    </Table>
  </div>
</template>
<script>
/* eslint-disable */
import { computed, onMounted, reactive, ref, unref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import Table, { ActionButton } from '@common/Table';
import { ErrorTable, EmptyTable } from '@common/Table';
import Button from '@common/Button';

export default {
  components: {
    Table,
    ActionButton,
    Button,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const params = reactive({ page: 1, limit: 10 });

    const tHeaders = ref([
      {
        title: 'Title',
        accessor: 'title',
        align: 'left',
      },
      { title: 'Banner', accessor: 'banner', width: '10%', type: 'image' },
      {
        title: 'Banner Mobile',
        accessor: 'banner_mobile',
        width: '10%',
        type: 'image',
      },
      { title: 'Url', accessor: 'url' },
      {
        accessor: 'action',
        colSpan: 3,
        width: '12%',
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
            name: 'Update Hero',
            params: {
              hash_id: data.hash_id,
              data: JSON.stringify(data),
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

    const deleteData = ({ hash_id }) => {
      store.dispatch('hero/deleteData', {
        action: 'form.delete',
        hash_id,
        params,
      });
    };

    const pagination = computed(() => {
      return store.getters['hero/getPagination'];
    });

    const fetchData = () => {
      store.dispatch('hero/fetchData', params);
    };

    const filteredData = computed(() => {
      return store.getters['hero/getItems'];
    });

    const requestStatus = computed(() => {
      return store.getters['hero/getRequestStatus'];
    });

    const emptyDataComponent = computed(() => {
      const request = unref(requestStatus);

      return request.error.status ? ErrorTable : EmptyTable;
    });

    const handlePageChange = pageParams => {
      Object.assign(params, pageParams);

      fetchData();
    };

    const createHero = () => {
      router.push('/hero/create');
    };

    const handleSearchCallback = () => {
      // console.log(params)
    };

    onMounted(fetchData);

    return {
      fetchData,
      requestStatus,
      filteredData,
      pagination,
      tHeaders,
      emptyDataComponent,
      actionButtons,
      deleteData,
      handlePageChange,
      handleSearchCallback,
      createHero,
    };
  },
};
</script>
