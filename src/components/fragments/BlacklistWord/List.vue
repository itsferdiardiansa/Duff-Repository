<template>
  <div class="container">
    <div class="wrapper">
      <Table
        :headers="tHeaders"
        :items="filteredData"
        :showLoader="isFetching"
        :rowLoader="2"
      >
        <template v-slot:status="props">
          <Badge
            :textBold="true"
            size="sm"
            variant="danger"
            shape="circle"
            :label="props.data.status"
          />
        </template>

        <template v-slot:blacklist_at> Event Name </template>

        <template v-slot:action>
          <Button :textBold="true" size="sm" variant="warning">
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
import Badge from '@common/Badge'
import Button from '@common/Button'
import data from '@mock/collections'

export default {
  components: {
    Button,
    Table,
    Badge,
  },
  setup() {
    const store = useStore()

    let tHeaders = ref([
      {
        title: 'Word',
        accessor: 'path',
        width: '20%',
        align: 'left',
      },
      {
        title: 'Blacklist at',
        accessor: 'blacklist_at',
        width: '60%',
        align: 'left',
      },
      { title: 'Status', accessor: 'status', width: '5%', align: 'center' },
      {
        title: 'Action',
        accessor: 'action',
        colSpan: 3,
        width: '5%',
        align: 'center',
      },
    ])

    const filteredData = computed(() => {
      return data.url_redirection.result
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
