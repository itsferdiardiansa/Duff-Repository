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
      @onSearchCallback="handleSearchCallback"
    >
      <template #banner="{ data }">
        <img :src="data.banner" class="h-10 m-auto" />
      </template>

      <template #url="{ data }">
        <a :href="data.button_url" target="_blank">{{ data.button_url }}</a>
      </template>

      <template #description="{ data }">
        <div class="flex items-center">
          <label class="mr-4">Color title: </label>
          <div
            :style="{ backgroundColor: data.title_color }"
            class="w-6 h-6 rounded border-gray-100 border"
          ></div>
        </div>

        <div class="flex items-center">
          <label class="mr-4">Color description: </label>
          <div
            :style="{ backgroundColor: data.description_color }"
            class="w-6 h-6 rounded border-gray-100 border"
          ></div>
        </div>
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
import { computed, onMounted, reactive, ref, unref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import Table, { ActionButton } from '@common/Table';
import { ErrorTable, EmptyTable } from '@common/Table';
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
    const params = reactive({ page: 1, limit: 2 });

    const tHeaders = ref([
      {
        title: 'Title',
        accessor: 'title',
        align: 'left',
      },
      { title: 'Banner', accessor: 'banner', width: '10%' },
      { title: 'Url', accessor: 'url' },
      { title: 'Description', accessor: 'description' },
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
          toggleModal(e, data);
        },
      },
    ]);

    const toggleModal = (e, data) => {
      self.$modal.show(data);
    };

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
