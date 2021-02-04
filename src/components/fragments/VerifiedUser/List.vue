<template>
  <div class="container">
    <div class="wrapper">
      <Table
        :headers="tHeaders"
        :items="filteredData"
        :emptyDataComponent="emptyDataComponent"
        :showLoader="isFetching"
        :rowLoader="2"
        @onSearchCallback="handleSearch"
      >
        <template v-slot:organizationName="props">
          <div class="flex">
            <div class="img-thumb w-24">
              <img :src="props.data.organizationName.imgThumb" />
            </div>

            <div class="detail ml-3">
              <h3 class="font-black text-lg">
                {{ props.data.organizationName.title }}
              </h3>

              <p>Company Name: {{ props.data.organizationName.companyName }}</p>
              <p>Email: {{ props.data.organizationName.email }}</p>
              <p>Phone: {{ props.data.organizationName.phone }}</p>
            </div>
          </div>
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
import EmptyData from './EmptyData'
import ActionButton from './ActionButton'
import data from '@mock/collections'

export default {
  components: {
    Table,
    ActionButton,
  },
  setup() {
    const store = useStore()

    let tHeaders = ref([
      {
        title: 'Organization Name',
        accessor: 'organizationName',
        width: '80%',
        align: 'left',
      },
      {
        title: 'Action',
        accessor: 'action',
        colSpan: 3,
        width: '20%',
        align: 'center',
      },
    ])

    const filteredData = computed(() => {
      return data.verifiedUser.result
    })

    const isFetching = computed(() => {
      return store.getters['thematicPage/getFetchStatus']
    })

    const emptyDataComponent = computed(() => EmptyData)

    const handleSearch = e => {
      console.log(e)
    }

    return {
      isFetching,
      filteredData,
      tHeaders,
      emptyDataComponent,
      handleSearch
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
