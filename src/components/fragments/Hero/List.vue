<template>
  <div class="container">
    <div class="wrapper">
      <Table
        :headers="tHeaders"
        :items="[]"
        :emptyDataComponent="emptyDataComponent"
        :showLoader="requestStatus.fetch"
        :rowLoader="2"
        :onFailedFetchHandler="getHero"
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
            <div :style="{backgroundColor: data.title_color}" class="w-6 h-6 rounded border-gray-100 border"></div>
          </div>

          <div class="flex items-center">
            <label class="mr-4">Color description: </label>
            <div :style="{backgroundColor: data.description_color}" class="w-6 h-6 rounded border-gray-100 border"></div>
          </div>
        </template>

        <template #status>
          Actieve
        </template>

        <template #order="{ data }">
          <OrderButton :data="data" />
        </template>

        <template #action="{ data }">
          <ActionButton :data="data" />
        </template>
      </Table>
    </div>
  </div>
</template>
<script>
import { computed, onMounted, ref, unref } from 'vue'
import { useStore } from 'vuex'
import Table from '@common/Table'
import { ErrorTable, EmptyTable } from '@common/Table'
// import Badge from '@common/Badge'
import ActionButton from './ActionButton'
import OrderButton from './OrderButton'

export default {
  components: {
    Table,
    OrderButton,
    ActionButton,
    // Badge,
  },
  setup() {
    const store = useStore()

    let tHeaders = ref([
      {
        title: 'Title',
        accessor: 'title',
        align: 'left',
      },
      { title: 'Banner', accessor: 'banner', width: '10%' },
      { title: 'Url', accessor: 'url' },
      { title: 'Description', accessor: 'description', align: 'left' },
      { title: 'Order', accessor: 'order', width: '10%', align: 'center' },
      { title: 'Status', accessor: 'status', width: '15%', align: 'center' },
      {
        title: 'Action',
        accessor: 'action',
        colSpan: 3,
        width: '25%',
        align: 'center',
      },
    ])

    const getHero = () => {
      store.dispatch('hero/fetchData')
    }

    const filteredData = computed(() => {
      return store.getters['hero/getHero']
    })

    const requestStatus = computed(() => {
      return store.getters['hero/getRequestStatus']
    })

    const emptyDataComponent = computed(() => {
      const request = unref(requestStatus)
      
      return (request.error.status) ? ErrorTable : EmptyTable
    })

    onMounted(getHero)

    return {
      getHero,
      requestStatus,
      filteredData,
      tHeaders,
      emptyDataComponent,
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
