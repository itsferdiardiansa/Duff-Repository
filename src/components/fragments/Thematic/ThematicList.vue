<template>
  <div class="container">
    <div class="wrapper">
      <div class="p-6">
        <h3 class="text-lg font-black">Page List</h3>
      </div>

      <Table 
        :headers="tHeaders" 
        :items="filteredThematic"
        :emptyDataComponent="emptyDataComponent"
        :isLoading="isFetching"
        :rowLoader="10"
        :selectableRows="true"
      >
        <template v-slot:status>
          Pending
        </template>

        <template v-slot:action="props">
          <ActionButton :data="props.data" />
        </template>
      </Table>

      <div
        class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8 bg-gray-50"
      ></div>
    </div>
  </div>
</template>
<script>
import { onMounted, computed, ref } from 'vue'
import { useStore } from 'vuex'
import Table from '@common/Table'
import EmptyData from './EmptyData'
import ActionButton from './ActionButton'

export default {
  components: {
    Table,
    ActionButton
  },
  setup() {
    const store = useStore()

    let tHeaders = ref([
      { title: 'Author', accessor: 'updated_by', width: '15%', align: 'center' },
      { title: 'Token', accessor: 'hash_id', width: '10%', align: 'center' },
      { title: 'Status', accessor: 'status', width: '10%', align: 'center' },
      { title: 'Devices', accessor: 'hash_id', width: '10%', align: 'center' },
      { title: 'Thematic', accessor: null },
      { title: 'Page Info', accessor: 'meta_title', width: '11%' },
      { title: 'Path', accessor: 'path', width: '11%', align: 'center' },
      { title: 'Action', accessor: 'action', colSpan: 3, width: '25%', align: 'center' },
    ])

    const getThematic = () => {
      store.dispatch('thematicPage/fetchThematicPage')
    }
    const filteredThematic = computed(() => {
      return store.getters['thematicPage/getThematicPage']
    })

    const isFetching = computed(() => {
      return store.getters['thematicPage/getFetchStatus']
    })

    const emptyDataComponent = computed(() => EmptyData)

    onMounted(getThematic)

    return {
      isFetching,
      filteredThematic,
      tHeaders,
      emptyDataComponent
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