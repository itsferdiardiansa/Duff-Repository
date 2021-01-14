<template>
  <div class="container">
    <div class="py-6 align-middle inline-block min-w-full shadow overflow-hidden bg-gray-50 shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg">
      <div class="p-6">
        <h3 class="text-lg font-black ">Page List</h3>
      </div>

      <div class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8 bg-gray-50">
        <TableContainer>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Thematic Name</TableCell>
              <TableCell>Page Info</TableCell>
              <TableCell>Path</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <template v-for="(item, key) in filteredThematic" :key="key">
              <TableRow>
                <TableCell :cellHead="false" v-text="key+1"></TableCell>
                <TableCell :cellHead="false" v-text="item.updated_by"></TableCell>
                <TableCell :cellHead="false" v-text="item.header_text"></TableCell>
                <TableCell :cellHead="false" v-text="item.meta_title"></TableCell>
                <TableCell :cellHead="false" v-text="item.path"></TableCell>
                <TableCell>
                  <Button label="Edit" />
                </TableCell>
              </TableRow>
            </template>
          </TableBody>
        </TableContainer>

        <div class="sm:flex-1 sm:flex sm:justify-end mt-4 work-sans">
          <div class="float-right">
            <nav class="relative z-0 inline-flex shadow-sm">
              <div>
                <a href="#" class="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-tertiary active:text-gray-700 transition ease-in-out duration-150 hover:bg-tertiary">
                    1
                </a>
                <a href="#" class="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-tertiary active:text-gray-700 transition ease-in-out duration-150 hover:bg-tertiary">
                    2
                  </a>
                  <a href="#" class="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-tertiary active:text-gray-700 transition ease-in-out duration-150 hover:bg-tertiary">
                    3
                  </a>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { onMounted, computed } from 'vue'
import { useStore  } from 'vuex'
import Button from '@common/Button'

import {
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell
} from '@common/Table'

export default {
  components: {
    Button,
    TableContainer,
    TableHead,
    TableBody,
    TableRow,
    TableCell
  },
  setup() {
    const store = useStore()

    const getThematic = () => {
      store.dispatch('thematicPage/fetchThematicPage')
    }
    const filteredThematic = computed(() => {
      return store.getters['thematicPage/getThematicPage']
    })

    onMounted(getThematic)

    return {
      filteredThematic
    }
  }
}
</script>