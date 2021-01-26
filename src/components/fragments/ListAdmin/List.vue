<template>
  <div class="container">
    <div class="wrapper">
      <Table
        :headers="tHeaders"
        :items="filteredData"
        :isLoading="isFetching"
        :rowLoader="2"
      >
        <template v-slot:roleName="{ data }">
          <div>
            <p class="mb-2">{{ data.roleName }}</p>
            <p class="text-xs">{{ data.email }}</p>
          </div>
        </template>

        <template v-slot:action="{ data }">
          <ActionButton :data="data" />
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
        title: 'Role Name',
        accessor: 'roleName',
        width: '20%',
        align: 'left',
      },
      { title: 'Previleges Role', accessor: 'previlagesRole', align: 'left' },
      { title: 'Previleges Menu', accessor: 'previlagesMenu', align: 'left' },
      {
        title: 'Action',
        accessor: 'action',
        colSpan: 1,
        align: 'center',
      },
    ])

    const filteredData = computed(() => {
      return data.listAdmin.result
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
