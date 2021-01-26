<template>
  <div class="container">
    <div class="wrapper">
      <div class="py-6 flex justify-between items-center">
        <h3 class="text-lg font-black">Page List</h3>

        <Button
          :textBold="true"
          @click="createThematicPage"
          label="Create Thematic Page"
          variant="primary"
        />
      </div>

      <Table
        :headers="tHeaders"
        :items="filteredThematic"
        :emptyDataComponent="emptyDataComponent"
        :isLoading="isFetching"
        :rowLoader="2"
        :selectableRows="true"
      >
        <template v-slot:status>
          <div class="flex justify-center">
            <Badge :textBold="true" size="sm" variant="dark" shape="circle">
              Pending
            </Badge>
          </div>
        </template>

        <template v-slot:thematic>
          <Badge
            :textBold="true"
            size="sm"
            variant="danger"
            shape="circle"
            label="active"
          />
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
import Badge from '@common/Badge'
import Button from '@common/Button'
import EmptyData from './EmptyData'
import ActionButton from './ActionButton'
import { useRouter } from 'vue-router'

export default {
  components: {
    Table,
    ActionButton,
    Badge,
    Button,
  },
  setup() {
    const store = useStore()
    const router = useRouter()

    let tHeaders = ref([
      {
        title: 'Author',
        accessor: 'updated_by',
        width: '15%',
        align: 'center',
      },
      { title: 'Token', accessor: 'hash_id', width: '10%', align: 'center' },
      { title: 'Status', accessor: 'status', width: '10%', align: 'center' },
      { title: 'Devices', accessor: 'hash_id', width: '10%', align: 'center' },
      { title: 'Thematic', accessor: 'thematic', align: 'center' },
      { title: 'Page Info', accessor: 'meta_title', width: '11%' },
      { title: 'Path', accessor: 'path', width: '11%', align: 'center' },
      {
        title: 'Action',
        accessor: 'action',
        colSpan: 3,
        width: '25%',
        align: 'center',
      },
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

    const createThematicPage = () => {
      router.push('/thematic-page/create')
    }

    onMounted(getThematic)

    return {
      isFetching,
      filteredThematic,
      tHeaders,
      emptyDataComponent,
      createThematicPage,
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
