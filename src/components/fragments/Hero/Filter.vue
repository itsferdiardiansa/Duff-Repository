<template>
  <div class="content-header flex items-center justify-between">
    <div class="flex items-center">
      <!-- <div class="title">
        <h2 class="font-bold text-2xl">Hero Data</h2>
      </div> -->

      <!-- <div class="filter-select ml-5 w-48">
        <select class="p-2 border-gray-5=400 border appearance-none w-full">
          <option>All</option>
          <option selected>Active</option>
          <option>Inactive</option>
        </select>
      </div> -->
    </div>

    <div class="btn-create float-right">
      <Button 
        variant="primary"
        :bold="true"
        :icon="['fa', 'plus']" 
        @click="handleClick" 
      >
        Create Hero
      </Button>
    </div>
  </div>
</template>
<script>
import Button from '@common/Button'
import { useRouter } from 'vue-router'

export default {
  components: {
    Button,
  },
  setup() {
    const router = useRouter()

    const handleClick = () => {
      router.push('/hero/create')
    }

    return {
      handleClick,
    }
  },
}
</script>
