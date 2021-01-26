<template>
  <div class="container">
    <div class="wrapper">
      <Table
        :headers="tHeaders"
        :items="filteredData"
        :emptyDataComponent="emptyDataComponent"
        :isLoading="isFetching"
        :rowLoader="2"
      >
        <template v-slot:status="props">
          <div class="flex items-center justify-center">
            <Badge
              :textBold="true"
              :variant="props.data.status ? 'success' : 'danger'"
              :dot="true"
              size="sm"
              shape="circle"
            />
            <span class="ml-2">{{
              props.data.status ? 'active' : 'inactive'
            }}</span>
          </div>
        </template>

        <template v-slot:icon="props">
          <img :src="props.data.icon" class="w-20 inline-block" />
        </template>

        <template v-slot:order="props">
          <OrderButton :data="props.data" />
        </template>

        <template v-slot:action="props">
          <ActionButton :data="props.data" />
        </template>
      </Table>
    </div>
  </div>
</template>
<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import Table from '@common/Table'
import Badge from '@common/Badge'
import EmptyData from './EmptyData'
import ActionButton from './ActionButton'
import OrderButton from './OrderButton'
import data from '@mock/collections'

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
        accessor: 'partnerName',
        width: '20%',
        align: 'center',
      },
      { title: 'Icon', accessor: 'icon', width: '30%', align: 'center' },
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

    const filteredData = computed(() => {
      return data.partner.result
    })

    const isFetching = computed(() => {
      return store.getters['thematicPage/getFetchStatus']
    })

    const emptyDataComponent = computed(() => EmptyData)

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
