<template>
  <div class="container">
    <div class="wrapper">
      <Table
        :headers="tHeaders"
        :items="filteredData"
        :isLoading="isFetching"
        :rowLoader="2"
      >
        <template v-slot:event_detail="props">
          <h3 class="font-black text-lg mb-3">{{ props.data.title }}</h3>

          <p>
            Date: <span class="font-bold">{{ props.data.date }}</span>
          </p>
          <p>
            Time: <span class="font-bold">{{ props.data.time }}</span>
          </p>
        </template>

        <template v-slot:organization="props">
          <div class="flex">
            <div class="img-thumb">
              <img :src="props.data.imgThumb" class="w-20" />
            </div>

            <div class="ml-3">
              <h3 class="font-black text-lg mb-2">
                {{ props.data.organizationName }}
              </h3>

              <p class="text-xs mb-1">{{ props.data.email }}</p>
              <p class="text-xs">{{ props.data.phone }}</p>
            </div>
          </div>
        </template>

        <template v-slot:widthdraw_detail="props">
          <p>
            Requested Date:
            <span class="font-bold">{{ props.data.withdrawDetail.date }}</span>
          </p>
          <p>
            Withdraw Amount:
            <span class="font-bold">{{
              props.data.withdrawDetail.amount
            }}</span>
          </p>
          <p>
            Error Message:
            <span class="font-bold">{{
              props.data.withdrawDetail.errorMsg
            }}</span>
          </p>
        </template>

        <template v-slot:action>
          <Button :textBold="true" size="sm" variant="dark">
            <img svg-inline class="w-4 h-4" src="@icon/pencil.svg" />
          </Button>
        </template>
      </Table>
    </div>
  </div>
</template>
<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import Table from '@common/Table'
import Button from '@common/Button'
import data from '@mock/collections'

export default {
  components: {
    Button,
    Table,
  },
  setup() {
    const store = useStore()

    let tHeaders = ref([
      {
        title: 'Event Detail',
        accessor: 'event_detail',
        width: '30%',
        align: 'left',
      },
      { title: 'Organization', accessor: 'organization', align: 'left' },
      { title: 'Withdraw Detail', accessor: 'widthdraw_detail', align: 'left' },
      {
        title: 'Action',
        accessor: 'action',
        colSpan: 3,
        width: '5%',
        align: 'center',
      },
    ])

    const filteredData = computed(() => {
      return data.failedWithdraw.result
    })

    const isFetching = computed(() => {
      return store.getters['thematicPage/getFetchStatus']
    })

    return {
      isFetching,
      filteredData,
      tHeaders,
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
