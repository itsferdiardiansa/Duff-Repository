<template>
  <div class="content-container">
    <div class="wrapper">
      <Table
        :headers="tHeaders"
        :items="filteredData"
        :isFetching="requestStatus.fetch"
        :onError="requestStatus.error.status"
        :onFailedFetchHandler="fetchData"
      >
        <template #position="{ data }">
          <p v-text="getPosition(data.position)"></p>
        </template>

        <template #action="{ data }">
          <ActionButton :data="actionButtons" :item="data" />
        </template>
      </Table>
    </div>
  </div>

  <Modal
    title="Delete confirmation"
    description="Are you sure you want to delete this item?"
  />
</template>
<script>
import { computed, onMounted, reactive, ref, unref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useStore } from 'vuex';
import Table, { ActionButton } from '@common/Table';
import Modal from '@common/Modal';

export default {
  components: {
    Table,
    ActionButton,
    Modal,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const state = reactive({
      hash_id: null,
    });

    const tHeaders = ref([
      {
        title: 'Section Name',
        accessor: 'name',
        width: '20%',
        align: 'center',
      },
      { title: 'Position', accessor: 'position' },
      { title: 'Updated At', accessor: 'updated_at' },
      { title: 'Created At', accessor: 'created_at' },
      {
        title: 'Action',
        accessor: 'action',
        colSpan: 3,
        width: '25%',
        align: 'center',
      },
    ]);

    const actionButtons = ref([
      {
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
        icon: ['fa', 'trash'],
        variant: 'dark',
        onClickFn: (e, data) => {
          toggleModal(e, data);
        },
      },
      {
        icon: ['fa', 'plus'],
        text: 'Add Menu',
        bold: true,
        variant: 'dark',
        onClickFn: (e, { hash_id }) => {
          router.push({ name: 'Footer Detail List', params: { hash_id } });
        },
      },
    ]);

    const toggleModal = (e, data) => {
      self.$modal.show(data);
    };

    const fetchData = () => {
      store.dispatch('footer/fetchMenuList', unref(state));
    };

    const filteredData = computed(() => {
      return store.getters['footer/fetchData'];
    });

    const requestStatus = computed(() => {
      return store.getters['footer/getRequestStatus'];
    });

    const getPosition = position =>
      position === '0' ? '1 - Left Position' : '2 - Center Position';

    onMounted(() => {
      state.hash_id = route.params.hash_id;

      fetchData();
    });

    return {
      fetchData,
      requestStatus,
      filteredData,
      tHeaders,
      actionButtons,
      getPosition,
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
