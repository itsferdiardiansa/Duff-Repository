<template>
  <div class="container">
    <div class="wrapper">
      <Table
        :headers="tHeaders"
        :items="filteredData"
        :isLoading="isFetching"
        :rowLoader="2"
      >
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
        title: 'Pivot Bank',
        accessor: 'pivotBank',
        width: '30%',
        align: 'left',
      },
      { title: 'Bank Neo', accessor: 'bankNeo', align: 'left' },
      { title: 'Bank LPS', accessor: 'bankLPS', align: 'center' },
      {
        title: 'Action',
        accessor: 'action',
        colSpan: 3,
        align: 'center',
      },
    ])

    const filteredData = computed(() => {
      return data.pivotBank.result
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
