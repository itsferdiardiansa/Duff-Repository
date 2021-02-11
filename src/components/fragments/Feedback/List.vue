<template>
  <div class="container">
    <div class="wrapper">
      <Table
        :headers="tHeaders"
        :items="filteredData"
        :isFetching="requestStatus.fetch"
        :onError="requestStatus.error.status"
      >
        <template #action="{ data }">
          <ActionButton :data="actionButtons" :item="data" /> 
        </template>
      </Table>
    </div>
  </div>
</template>
<script>
import { computed, onMounted, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import Table, { ActionButton } from '@common/Table'
// import ActionButton from './ActionButton'

export default {
  components: {
    Table,
    ActionButton,
  },
  setup() {
    const store = useStore()

    const tHeaders = ref([
      {
        title: 'Email',
        accessor: 'email',
        width: '15%',
        align: 'left',
      },
      { title: 'Name', accessor: 'name', width: '15%' },
      { title: 'Page', accessor: 'page' },
      { title: 'Section', accessor: 'section' },
      { title: 'Responded by', accessor: 'responded_by' },
      { title: 'Read by', accessor: 'read_by' },
      {
        title: 'Action',
        accessor: 'action',
        colSpan: 1,
        align: 'center',
      },
    ])

    const actionButtons = reactive([
      {
        variant: 'dark',
        icon: ['fa', 'marker'],
        text: 'Mark as responded',
        bold: true,
        onClickFn: (e, data) => {
          markAsResponded(e, data)
        }
      },
      {
        variant: 'dark',
        icon: ['fa', 'bookmark'],
        text: 'Mark as read',
        inverse: true,
        bold: true,
        onClickFn: (e, data) => {
          markAsRead(e, data)
        }
      }
    ])

    const getFeedback = () => {
      store.dispatch('feedback/fetchData')
    }

    const markAsResponded = (e, data) => {
      store.dispatch('feedback/markAsResponded', {
        data,
        action: 'form.create',
        status: 'success',
      })
    }

    const markAsRead = (e, data) => {
      store.dispatch('feedback/markAsRead', {
        data,
        action: 'form.create',
        status: 'success',
      })
    }

    const filteredData = computed(() => {
      return store.getters['feedback/getItems']
    })

    const requestStatus = computed(() => {
      return store.getters['feedback/getRequestStatus']
    })

    onMounted(getFeedback)

    return {
      requestStatus,
      filteredData,
      tHeaders,
      actionButtons
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
