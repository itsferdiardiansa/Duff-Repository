<template>
  <div class="container">
    <div class="wrapper">
      <Table
        :headers="tHeaders"
        :items="filteredData"
        :emptyDataComponent="emptyDataComponent"
        :showLoader="isFetching"
        :rowLoader="2"
        :selectableRows="true"
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
          <ActionButton :data="data" />
        </template>
      </Table>
    </div>
  </div>
</template>
<script>
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import Table from '@common/Table'
import Badge from '@common/Badge'
import EmptyData from './EmptyData'
import ActionButton from './ActionButton'
import OrderButton from './OrderButton'

export default {
  components: {
    Table,
    OrderButton,
    ActionButton,
    Badge,
  },
  setup() {
    const store = useStore()

    let tHeaders = ref([
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

    const getPartner = () => {
      store.dispatch('partner/fetchData')
    }

    const filteredData = computed(() => {
      return store.getters['partner/getPartner']
    })

    const isFetching = computed(() => {
      return store.getters['partner/getFetchStatus']
    })

    const emptyDataComponent = computed(() => EmptyData)

    onMounted(getPartner)

    return {
      isFetching,
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
