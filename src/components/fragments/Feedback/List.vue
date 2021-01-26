<template>
  <div class="container">
    <div class="wrapper">
      <Table
        :headers="tHeaders"
        :items="filteredData"
        :isLoading="isFetching"
        :rowLoader="2"
      >
        <template v-slot:eventName="{ data }">
          <div>
            <a :href="data.link" class="text-yellow-600 text-base">{{
              data.title
            }}</a>

            <p class="text-xs">
              creator: <span>{{ data.creator }}</span>
            </p>
          </div>
        </template>

        <template v-slot:discount="{ data }">
          <div class="">
            <p>
              Percentage: <span>{{ data.discount.percentage }}</span>
            </p>
            <p>
              Fixed: <span class="font-black">{{ data.discount.fixed }}</span>
            </p>
          </div>
        </template>

        <template v-slot:discountAmount="{ data }">
          <p class="font-black">{{ data.discount.amount }}</p>
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
import data from '@mock/collections'
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
        title: 'Email',
        accessor: 'email',
        width: '20%',
        align: 'left',
      },
      { title: 'Name', accessor: 'name', width: '20%', align: 'left' },
      { title: 'Page', accessor: 'page', align: 'center' },
      { title: 'Section', accessor: 'section', align: 'center' },
      { title: 'Rate', accessor: 'rate', align: 'center' },
      {
        title: 'Action',
        accessor: 'action',
        colSpan: 1,
        align: 'center',
      },
    ])

    const filteredData = computed(() => {
      return data.feedback.result
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
