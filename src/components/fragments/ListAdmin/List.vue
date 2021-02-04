<template>
  <div class="container">
    <div class="wrapper">

      <Table
        :headers="tHeaders"
        :items="filteredData"
        :showLoader="isFetching"
        :rowLoader="2"
      >
        <template #adminAccess="{ data: { is_super_admin } }">
          <Badge 
            :variant="getVariant(is_super_admin)"
          >
            {{ (is_super_admin) ? 'inactive' : 'active' }}
          </Badge>
        </template>

        <template v-slot:action="{ data }">
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
import Badge from '@common/Badge'
import ActionButton from './ActionButton'

export default {
  components: {
    Table,
    Badge,
    ActionButton,
  },
  setup() {
    const store = useStore()

    let tHeaders = ref([
      {
        title: 'Role Name',
        accessor: 'name',
        width: '20%',
        align: 'left',
      },
      { title: 'Email', accessor: 'email', align: 'left' },
      { title: 'Admin Access', accessor: 'adminAccess' },
      { title: 'Created at', accessor: 'created_at', align: 'left' },
      {
        title: 'Action',
        accessor: 'action',
        colSpan: 1,
        align: 'center',
      },
    ])

    const getAdmin = () => {
      store.dispatch('admin/fetchData')
    }

    const filteredData = computed(() => {
      return store.getters['admin/getAdmin']
    })

    const isFetching = computed(() => {
      return store.getters['admin/getFetchStatus']
    })

    const getVariant = status => (
      (status) ? 'success' : 'warning'
    )

    onMounted(getAdmin)

    return {
      isFetching,
      filteredData,
      tHeaders,
      getVariant
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
