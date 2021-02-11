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
        <template #previlage="{ data }">
          <div class="previlage-col">
            <template v-for="(item, key) in data.previlege" :key="key">
              <Badge variant="primary" :inverse="true" class="mr-2">
                {{ item.id_privilege }}
              </Badge>
            </template>
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
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import Table, { EmptyTable  as emptyComponent, ActionButton } from '@common/Table'
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
      {
        title: 'Role Name',
        accessor: 'name',
        width: '20%'
      },
      { title: 'Previlage', accessor: 'previlage' },
      { title: 'Created at', accessor: 'created_at' },
      { title: 'Updated at', accessor: 'updated_at' },
      {
        title: 'Action',
        accessor: 'action',
        colSpan: 1,
        align: 'center',
      },
    ])

    const actionButtons = ref([
      {
        icon: ['fa', 'pencil-alt'],
        variant: 'dark',
        onClickFn: (e, data) => {
          router.push({ name: 'Update Role', params: {hash_id: data.hash_id, name: data.name, previleges: JSON.stringify(data.previlege)} })
        }
      },
      {
        icon: ['fa', 'trash'],
        variant: 'dark',
        onClickFn: (e, data) => {
          toggleModal(e, data)
        }
      }
    ])

    const toggleModal = (e, data) => {
      self.$modal.show(data)
    }

    const deleteData = ({ hash_id }) => {
      store.dispatch('role/deleteData', {
        hash_id,
        action: 'form.delete',
      })
    }

    const fetchData = () => {
      store.dispatch('role/fetchData')
    }

    const filteredData = computed(() => {
      return store.getters['role/getItems']
    })

    const requestStatus = computed(() => {
      return store.getters['role/getRequestStatus']
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
      toggleModal
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
