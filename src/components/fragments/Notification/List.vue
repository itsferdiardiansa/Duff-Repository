<template>
  <div class="container">
    <div class="wrapper">
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
      >
        <template #description="{ data }">
          <div class="text-left">
            <h3
              class="text-base font-bold max-w-xl"
              style="word-break: break-word"
            >
              {{ data.title }}
            </h3>

            <p class="text-left mt-1 text-sm">
              {{ data.description }}
            </p>

            <div>
              <a :href="data.link" class="text-blue-500" target="_blank"
                >Selengkapnya</a
              >
            </div>
          </div>
        </template>

        <template #action="{ data }">
          <ActionButton :data="actionButtons" :item="data" />
        </template>
      </Table>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import Table, {
  EmptyTable as emptyComponent,
  ActionButton,
} from '@common/Table'
import Badge from '@common/Badge'
import Modal from '@common/Modal'
import { useRouter } from 'vue-router'

export default {
  components: {
    Table,
    Badge,
    Modal,
    ActionButton,
  },
  setup() {
    const store = useStore()
    const router = useRouter()

    const tHeaders = ref([
      { title: 'Message', width: '80%', accessor: 'description' },
      {
        title: 'Action',
        accessor: 'action',
        align: 'center',
      },
    ])

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
          })
        },
      },
      {
        icon: ['fa', 'trash'],
        variant: 'dark',
        onClickFn: (e, data) => {
          toggleModal(e, data)
        },
      },
    ])

    const toggleModal = (e, data) => {
      self.$modal.show(data)
    }

    const deleteData = ({ hash_id }) => {
      store.dispatch('notification/deleteData', {
        hash_id,
        action: 'form.delete',
      })
    }

    const fetchData = () => {
      store.dispatch('notification/fetchData')
    }

    const filteredData = computed(() => {
      return store.getters['notification/getItems']
    })

    const requestStatus = computed(() => {
      return store.getters['notification/getRequestStatus']
    })

    onMounted(fetchData)

    return {
      requestStatus,
      filteredData,
      tHeaders,
      fetchData,
      deleteData,
      emptyComponent,
      actionButtons,
      toggleModal,
    }
  },
}
</script>
<style lang="scss" scoped>
.container {
  @apply relative;

  .wrapper {
    @apply relative;
  }

  .previlage-col {
    @apply flex justify-center;
  }
}
</style>
