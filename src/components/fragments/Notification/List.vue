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
      <template #description="{ data }">
        <div class="description-col">
          <h3 style="word-break: break-word">
            {{ data.title }}
          </h3>

          <p class="article" v-html="data.description"></p>

          <div>
            <a :href="data.link" class="link" target="_blank">Selengkapnya</a>
          </div>
        </div>
      </template>

      <template #action="{ data }">
        <ActionButton :data="actionButtons" :item="data" />
      </template>
    </Table>
  </div>
</template>
<script>
/* eslint-disable */
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
      { title: 'Message', width: '80%', accessor: 'description' },
      {
        title: 'Action',
        accessor: 'action',
        align: 'center',
      },
    ]);

    const actionButtons = ref([
      {
        icon: ['fa', 'pencil-alt'],
        variant: 'dark',
        onClickFn: (e, data) => {
          router.push({
            name: 'Update Notification',
            params: {
              hash_id: data.hash_id,
              data: JSON.stringify(data),
            },
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

    const fetchData = () => {
      store.dispatch('notification/fetchData', params);
    };

    const pagination = computed(() => {
      return store.getters['notification/getPagination'];
    });

    const filteredData = computed(() => {
      return store.getters['notification/getItems'];
    });

    const requestStatus = computed(() => {
      return store.getters['notification/getRequestStatus'];
    });

    const deleteData = ({ hash_id }) => {
      store.dispatch('notification/deleteData', {
        action: 'form.delete',
        hash_id,
        params,
      });
    };

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
.list {
  @apply relative;

  .wrapper {
    @apply relative;
  }

  .previlage-col {
    @apply flex justify-center;
  }

  .description-col {
    @apply text-left;

    h3 {
      @apply text-base font-bold max-w-xl;
    }

    .article {
      @apply text-left mt-1 text-sm;
    }

    .link {
      @apply text-blue-500;
    }
  }
}
</style>
