<template>
  <div class="container">
    <div class="wrapper">
      <div class="py-6 flex justify-end items-center">
        <Button
          label="Create Thematic Page"
          variant="primary"
          :bold="true"
          :icon="['fa', 'plus']"
          @click="createThematicPage"
        />
      </div>

      <Table
        :headers="tHeaders"
        :items="filteredThematic"
        :isFetching="requestStatus.fetch"
        :onError="requestStatus.error.status"
        :onFailedFetchHandler="getThematic"
      >
        <template #header_image="{data}">
          <img :src="data.header_image" />
        </template>

        <template #header_image_mobile="{data}">
          <img :src="data.header_image_mobile" />
        </template>

        <template #page_info="{data}">
          <div class="text-left">
            <h3 class="font-bold" v-text="data.header_text"></h3>
            <p v-text="data.description_text"></p>
          </div>
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
import { onMounted, computed, ref, unref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import Table, { ActionButton } from '@common/Table'
import { ErrorTable, EmptyTable } from '@common/Table'
// import Badge from '@common/Badge'
import Button from '@common/Button'
import Modal from '@common/Modal'

export default {
  components: {
    Table,
    // Badge,
    Button,
    Modal,
    ActionButton
  },
  setup() {
    const store = useStore()
    const router = useRouter()

    const tHeaders = ref([
      { title: 'Banner', accessor: 'header_image', width: '10%' },
      { title: 'Banner Mobile', accessor: 'header_image_mobile', width: '10%', align: 'center' },
      { title: 'Thematic Name', accessor: 'name', width: '15%', align: 'center' },
      { title: 'Page Info', accessor: 'meta_title' },
      { title: 'Created At', accessor: 'created_at', width: '11%', align: 'center' },
      { title: 'Path', accessor: 'path', width: '11%', align: 'center' },
      { title: 'Action', accessor: 'action', align: 'center' },
    ])

    const actionButtons = ref([
      {
        icon: ['fa', 'pencil-alt'],
        variant: 'dark',
        onClickFn: (e, data) => {
          router.push({ name: 'Update Thematic Page', params: {data: JSON.stringify(data)} })
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

    const getThematic = () => {
      store.dispatch('thematicPage/fetchData')
    }

    const toggleModal = (e, data) => {
      self.$modal.show(data)
    }
    
    const deleteData = ({ hash_id }) => {
      store.dispatch('thematicPage/deleteData', {
        hash_id,
        action: 'form.delete',
        status: 'success'
      })
    }

    const filteredThematic = computed(() => {
      return store.getters['thematicPage/getThematicPage']
    })

     const requestStatus = computed(() => {
      return store.getters['thematicPage/getRequestStatus']
    })

    const emptyDataComponent = computed(() => {
      const request = unref(requestStatus)
      
      return (request.error.status) ? ErrorTable : EmptyTable
    })

    const createThematicPage = () => {
      router.push('/thematic-page/create')
    }

    const getPath = path => '/e/' +path

    onMounted(getThematic)

    return {
      requestStatus,
      filteredThematic,
      getThematic,
      tHeaders,
      emptyDataComponent,
      createThematicPage,
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
    @apply py-6 align-middle inline-block min-w-full shadow overflow-hidden bg-gray-50 px-8 pt-3 rounded-bl-lg rounded-br-lg;
  }
}
</style>
