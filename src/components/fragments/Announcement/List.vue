<template>
  <div class="container">
    <div class="wrapper">
      <Table
        :headers="tHeaders"
        :items="filteredData"
        :showLoader="isFetching"
        :rowLoader="2"
        :selectableRows="true"
        :pagination="paginationData"
        @onSelectedRowCallback="handleSelectRow"
      >
        <template #link="props">
          <a :href="props.data.link" target="_blank" class="underline"
            >Selengkapnya</a
          >
        </template>

        <template #status="props">
          <Status :data="props.data.status" />
        </template>

        <template #action="props">
          <ActionButton :data="props.data" />
        </template>
      </Table>
    </div>
  </div>
</template>
<script>
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import Table from '@common/Table'
import ActionButton from './ActionButton'
import Status from './Status'

export default {
  components: {
    Table,
    ActionButton,
    Status,
  },
  setup() {
    const store = useStore()

    let tHeaders = ref([
      {
        title: 'Title',
        accessor: 'title',
        width: '30%',
      },
      { title: 'Content', accessor: 'content' },
      { title: 'Link', accessor: 'link', align: 'center' },
      { title: 'Status', accessor: 'status', width: '9%', align: 'center' },
      { title: 'Expired', accessor: 'expired', align: 'center' },
      {
        title: 'Action',
        accessor: 'action',
        colSpan: 3,
        align: 'center',
      },
    ])

    const getAnnouncement = () => {
      store.dispatch('announcement/fetchData')
    }

    const filteredData = computed(() => (
      store.getters['announcement/getAnnouncement']
    ))

    const paginationData = computed(() => (
      store.getters['announcement/getPagination']
    ))

    const isFetching = computed(() => (
      store.getters['announcement/getFetchStatus']
    ))

    const searchFilter = data => {
      console.log(data, 'List')
    }

    const handleSelectRow = () => {
      // console.log(data)
    }

    onMounted(() => {
      getAnnouncement()
    })

    return {
      isFetching,
      filteredData,
      paginationData,
      tHeaders,
      searchFilter,
      handleSelectRow
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
