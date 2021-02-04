<template>
  <div class="container">
    <Modal 
      :isShow="isShow" 
      :onConfirm="toggleModal" 
      :onCancel="toggleModal" 
    >
      <template v-slot:body>
        <p>This is confirmation message</p>
      </template>
    </Modal>

    <div class="wrapper">
      <Table
        :headers="tHeaders"
        :items="filteredData"
        :showLoader="isFetching"
        :rowLoader="2"
      >
        <template v-slot:action="props">
          <ActionButton :data="props.data" :toggleClick="toggleModal" />
        </template>
      </Table>
    </div>
  </div>
</template>
<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import Table from '@common/Table'
import Modal from '@common/Modal'
import data from '@mock/collections'
import ActionButton from './ActionButton'

export default {
  components: {
    Table,
    ActionButton,
    Modal
  },
  setup() {
    const store = useStore()
    const isShow = ref(false)

    let tHeaders = ref([
      {
        title: 'Pivot Bank',
        accessor: 'pivotBank',
        width: '30%',
        align: 'left',
      },
      { title: 'Bank Neo', accessor: 'bankNeo', align: 'left' },
      { title: 'Bank LPS', accessor: 'bankLPS', align: 'center' },
      {
        title: 'Action',
        accessor: 'action',
        colSpan: 3,
        align: 'center',
      },
    ])

    const filteredData = computed(() => {
      return data.pivotBank.result
    })

    const isFetching = computed(() => {
      return store.getters['thematicPage/getFetchStatus']
    })

    const toggleModal = () => {
      isShow.value = !isShow.value
    }

    return {
      isFetching,
      filteredData,
      tHeaders,
      isShow,
      toggleModal,
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
