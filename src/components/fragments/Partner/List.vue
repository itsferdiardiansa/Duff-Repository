<template>
  <div class="container">
    <div class="wrapper">
      <Modal
        title="Delete confirmation"
        description="Are you sure you want to delete this item?"
        :onConfirmFn="deleteData"
      />

      <div class="py-6 flex justify-end items-center">
        <Button
          label="Create Partner"
          variant="primary"
          :bold="true"
          :icon="['fa', 'plus']"
          @click="createPartner"
        />
      </div>

      <Table
        :headers="tHeaders"
        :items="filteredPartner"
        :isFetching="requestStatus.fetch"
        :onError="requestStatus.error.status"
        :onFailedFetchHandler="fetchData"
      >
        <template #status="{ data }">
          <div class="flex items-center justify-center">
            <Badge
              size="xs"
              :bold="true"
              :variant="data.status ? 'success' : 'danger'"
              :dot="true"
              :pill="true"
            />
            <span class="ml-2">{{
              data.status ? 'active' : 'inactive'
            }}</span>
          </div>
        </template>

        <template #logo="{ data }">
          <img :src="data.logo" class="w-20 inline-block" />
        </template>

        <template #order="{ data }">
          <OrderButton :data="data" />
        </template>

        <template #action="{ data }">
          <ActionButton :data="actionButtons" :item="data" />
        </template>
      </Table>
    </div>
  </div>
</template>
<script>
import { onMounted, computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import Table, { ActionButton } from '@common/Table'
import Badge from '@common/Badge'
import Button from '@common/Button'
import Modal from '@common/Modal'
import EmptyData from './EmptyData'
import OrderButton from './OrderButton'

export default {
  components: {
    Table,
    Badge,
    Button,
    Modal,
    ActionButton,
    OrderButton
  },
  setup() {
    const store = useStore()
    const router = useRouter()

    const tHeaders = ref([
      {
        title: 'Partner Name',
        accessor: 'name',
        width: '20%',
        align: 'center',
      },
      { title: 'Icon', accessor: 'logo', width: '30%', align: 'center' },
      { title: 'Order', accessor: 'order', width: '10%', align: 'center' },
      { title: 'Status', accessor: 'status', width: '10%', align: 'center' },
      {
        title: 'Action',
        accessor: 'action',
        colSpan: 3,
        width: '25%',
        align: 'center',
      },
    ])
    
    const actionButtons = ref([
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

    const fetchData = () => {
      store.dispatch('partner/fetchData')
    }
    const filteredPartner = computed(() => {
      return store.getters['partner/getPartner']
    })

    const deleteData = ({ hash_id }) => {
      store.dispatch('partner/deleteData', {
        hash_id,
        action: 'form.delete',
        message: 'Succesfully delete',
        status: 'success'
      })
    }

     const requestStatus = computed(() => {
      return store.getters['partner/getRequestStatus']
    })

    const emptyDataComponent = computed(() => EmptyData)

    const createPartner = () => {
      router.push('/partner/create')
    }

    const getPath = path => '/e/' +path

    onMounted(fetchData)

    return {
      requestStatus,
      filteredPartner,
      fetchData,
      tHeaders,
      emptyDataComponent,
      createPartner,
      getPath,
      actionButtons,
      deleteData
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
}
</style>
