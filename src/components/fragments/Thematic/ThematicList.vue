<template>
  <div class="container">
    <div class="wrapper">
      <div class="py-6 flex justify-between items-center">
        <h3 class="text-lg font-black">Page List</h3>

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
        :emptyDataComponent="emptyDataComponent"
        :showLoader="requestStatus.fetch"
        :rowLoader="2"
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


        <template #action="{data}">
          <ActionButton :data="data" />
        </template>
      </Table>
    </div>
  </div>
</template>
<script>
import { onMounted, computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import Table from '@common/Table'
// import Badge from '@common/Badge'
import Button from '@common/Button'
import EmptyData from './EmptyData'
import ActionButton from './ActionButton'

export default {
  components: {
    Table,
    // Badge,
    Button,
    ActionButton
  },
  setup() {
    const store = useStore()
    const router = useRouter()

    let tHeaders = ref([
      { title: 'Banner', accessor: 'header_image', width: '10%' },
      { title: 'Banner Mobile', accessor: 'header_image_mobile', width: '10%', align: 'center' },
      { title: 'Thematic Name', accessor: 'name', width: '15%', align: 'center' },
      { title: 'Page Info', accessor: 'meta_title' },
      { title: 'Created At', accessor: 'created_at', width: '11%', align: 'center' },
      { title: 'Path', accessor: 'path', width: '11%', align: 'center' },
      { title: 'Action', accessor: 'action', align: 'center' },
    ])

    const getThematic = () => {
      store.dispatch('thematicPage/fetchData')
    }
    const filteredThematic = computed(() => {
      return store.getters['thematicPage/getThematicPage']
    })

     const requestStatus = computed(() => {
      return store.getters['thematicPage/getRequestStatus']
    })

    const emptyDataComponent = computed(() => EmptyData)

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
      getPath
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
