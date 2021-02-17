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
      :withPagination="true"
      :pagination="pagination"
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

      <!-- <template #status>
        Active
      </template> -->

      <!-- <template #order="{ data }">
        <OrderButton :data="data" />
      </template> -->

      <template #action="{ data }">
        <ActionButton :data="actionButtons" :item="data" />
      </template>
    </Table>
  </div>
</template>
<script>
import { computed, onMounted, ref, unref } from 'vue';
import { useStore } from 'vuex';
import Table, { ActionButton } from '@common/Table';
import { ErrorTable, EmptyTable } from '@common/Table';
import Modal from '@common/Modal';

export default {
  components: {
    Table,
    ActionButton,
    Modal,
  },
  setup() {
    const store = useStore();

    const tHeaders = ref([
      {
        title: 'Title',
        accessor: 'title',
        align: 'left',
      },
      { title: 'Banner', accessor: 'banner', width: '10%' },
      { title: 'Url', accessor: 'url' },
      { title: 'Description', accessor: 'description' },
      // { title: 'Status', accessor: 'status', width: '5%', align: 'center' },
      {
        title: 'Action',
        accessor: 'action',
        colSpan: 3,
        width: '10%',
        align: 'center',
      },
    ]);

    const actionButtons = ref([
      {
        icon: ['fa', 'pencil-alt'],
        variant: 'dark',
        onClickFn: (e, data) => {
          console.log(e, data);
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
      store.dispatch('hero/deleteData', {
        hash_id,
        action: 'form.delete',
      });
    };

    const pagination = computed(() => {
      return store.getters['hero/getPagination'];
    });

    const fetchData = () => {
      store.dispatch('hero/fetchData');
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
    };
  },
};
</script>
