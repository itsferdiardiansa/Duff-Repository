<template>
  <div class="container">
    <div class="wrapper">
      <Table
        :headers="tHeaders"
        :items="filteredData"
        :showLoader="isFetching"
        :rowLoader="2"
      >
        <template v-slot:blacklist="props">
          <div>
            <h3 class="font-black textr-lg mb-2">{{ props.data.title }}</h3>

            <p>
              blacklist at: <span>{{ props.data.blacklistAt }}</span>
            </p>
            <p>
              reported at: <span>{{ props.data.reportedAt }}</span>
            </p>
          </div>
        </template>

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
        title: 'Blacklist Event Name / Desc / TNC',
        accessor: 'blacklist',
        width: '40%',
        align: 'left',
      },
      {
        title: 'Created Date',
        accessor: 'createdDate',
        width: '60%',
        align: 'left',
      },
      {
        title: 'Action',
        accessor: 'action',
        colSpan: 3,
        width: '5%',
        align: 'center',
      },
    ])

    const filteredData = computed(() => {
      return data.blacklistEvent.result
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
