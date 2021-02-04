<template>
  <div class="container">
    <div class="wrapper">
      <Table
        :headers="tHeaders"
        :items="filteredData"
        :showLoader="isFetching"
        :rowLoader="2"
      >
        <template #action="{ data }">
          <ActionButton :data="data" />
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

    const getFeedback = () => {
      store.dispatch('feedback/fetchData')
    }

    const filteredData = computed(() => {
      return store.getters['feedback/getFeedback']
    })

    const isFetching = computed(() => {
      return store.getters['feedback/getFetchStatus']
    })

    onMounted(getFeedback)

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
