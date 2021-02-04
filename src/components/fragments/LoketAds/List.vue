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
            :variant="props.data.status ? 'success' : 'danger'"
            :label="props.data.status ? 'active' : 'inactive'"
            size="sm"
            shape="circle"
          />
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
        title: 'Name',
        accessor: 'name',
        width: '20%',
        align: 'left',
      },
      { title: 'Category', accessor: 'category', width: '60%', align: 'left' },
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
      return data.loketAds.result
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
