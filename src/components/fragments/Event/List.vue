<template>
  <div class="container">
    <div class="wrapper">
      <Table
        :headers="tHeaders"
        :items="filteredData"
        :emptyDataComponent="emptyDataComponent"
        :showLoader="isFetching"
        :rowLoader="2"
      >
        <template v-slot:imgThumb="props">
          <div class="flex justify-center">
            <div class="img-thumb w-24 inline-block">
              <img :src="props.data.imgThumb" />
            </div>
          </div>
        </template>

        <template v-slot:event="props">
          <div>
            <div class="title">
              <h3 class="font-black text-lg">
                {{ props.data.title }}
              </h3>
            </div>

            <div class="flex mt-2">
              <div>
                <p>Total ticket sold: <strong>0</strong></p>
                <p>Total paid: <strong>0</strong></p>
              </div>

              <div class="ml-5">
                <p>
                  Event Date: <strong>{{ props.data.eventDate }}</strong>
                </p>
                <p>
                  Event Type: <strong>{{ props.data.eventType }}</strong>
                </p>
              </div>
            </div>
          </div>
        </template>

        <template v-slot:status="props">
          <div class="text-center">
            <Badge :dot="true" variant="success" />
            <span class="ml-2">{{
              props.data.status.tier ? 'Active' : 'Inactive'
            }}</span>
            <span class="px-2">|</span>
            <span>{{ props.data.status.role }}</span>
          </div>
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
import EmptyData from './EmptyData'
import ActionButton from './ActionButton'
import Badge from '@common/Badge'
import data from '@mock/collections'

export default {
  components: {
    Table,
    Badge,
    ActionButton,
  },
  setup() {
    const store = useStore()

    let tHeaders = ref([
      {
        title: 'Image',
        accessor: 'imgThumb',
      },
      {
        title: 'Event',
        accessor: 'event',
      },
      {
        title: 'Created Date',
        accessor: 'created_date',
      },
      {
        title: 'Status',
        accessor: 'status',
      },
      {
        title: 'Action',
        accessor: 'action',
        colSpan: 3,
        width: '20%',
        align: 'center',
      },
    ])

    const filteredData = computed(() => {
      return data.event.result
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
