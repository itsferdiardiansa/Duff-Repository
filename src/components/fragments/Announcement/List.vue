<template>
  <div class="container">
    <div class="wrapper">
      <Table
        :headers="tHeaders"
        :items="filteredData"
        :isLoading="isFetching"
        :rowLoader="2"
      >
        <template v-slot:link="props">
          <a :href="props.data.link" target="_blank" class="underline"
            >Selengkapnya</a
          >
        </template>

        <template v-slot:status="props">
          <Status :data="props.data.status" />
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
        align: 'left',
      },
      { title: 'Content', accessor: 'content', align: 'left' },
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

    const filteredData = computed(() => {
      return data.announcement.result
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
