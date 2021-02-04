<template>
  <div class="container">
    <div class="wrapper">
      <Table
        :headers="tHeaders"
        :items="filteredData"
        :emptyDataComponent="emptyDataComponent"
        :showLoader="requestStatus.fetch"
        :rowLoader="2"
        :onFailedFetchHandler="getFooter"
      >
        <template #position="{ data }">
          <p v-text="getPosition(data.position)"></p>
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
import ActionButton from './ActionButton'

export default {
  components: {
    Table,
    ActionButton,
  },
  setup() {
    const store = useStore()

    let tHeaders = ref([
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
    ])

    const getFooter = () => {
      store.dispatch('footer/fetchData')
    }

    const filteredData = computed(() => {
      return store.getters['footer/getFooter']
    })

    const requestStatus = computed(() => {
      return store.getters['footer/getRequestStatus']
    })

    const emptyDataComponent = computed(() => {
      const request = unref(requestStatus)
      
      return (request.error.status) ? ErrorTable : EmptyTable
    })

    const getPosition = position => (
      (position === "0") ? '1 - Left Position' : '2 - Center Position'
    )

    onMounted(getFooter)

    return {
      getFooter,
      requestStatus,
      filteredData,
      tHeaders,
      emptyDataComponent,
      getPosition
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
