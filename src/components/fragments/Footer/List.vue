<template>
  <div class="container">
    <div class="wrapper">
      <div class="py-6 flex justify-end items-center">
        <Button
          label="Add Group"
          variant="primary"
          :bold="true"
          :icon="['fa', 'plus']"
          @click="createFooter"
        />
      </div>

      <Table
        :headers="tHeaders"
        :items="filteredData"
        :isFetching="requestStatus.fetch"
        :onError="requestStatus.error.status"
        :onFailedFetchHandler="getFooter"
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
    :onConfirmFn="deleteData"
  />
</template>
<script>
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import Table, { ActionButton } from '@common/Table';
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

    console.log(router);
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
            name: 'Update Footer',
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

    const getFooter = () => {
      store.dispatch('footer/fetchData');
    };

    const filteredData = computed(() => {
      return store.getters['footer/getFooter'];
    });

    const requestStatus = computed(() => {
      return store.getters['footer/getRequestStatus'];
    });

    const deleteData = ({ hash_id }) => {
      store.dispatch('footer/deleteData', {
        hash_id,
        action: 'form.delete',
        status: 'success',
      });
    };

    const getPosition = position => {
      const list = [
        { value: 0, text: 'Position Top' },
        { value: 1, text: 'Position Right' },
        { value: 2, text: 'Position Bottom' },
        { value: 3, text: 'Position Left' },
      ];

      return list.find(item => item.value == position).text;
    };

    const createFooter = () => {
      router.push('/footer/create');
    };

    onMounted(getFooter);

    return {
      getFooter,
      requestStatus,
      filteredData,
      tHeaders,
      actionButtons,
      getPosition,
      deleteData,
      createFooter,
    };
  },
};
</script>
<style lang="scss" scoped>
.container {
  @apply relative;

  .wrapper {
    @apply relative;
  }
}
</style>
