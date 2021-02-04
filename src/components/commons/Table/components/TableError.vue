<template>
  <div class="h-72 pb-20">
    <div class="h-full img mb-10">
      <img svg-inline class="h-full w-full" src="@icon/empty.svg" />
    </div>

    <label class="text-lg font-medium mr-4">Oops...Something went wrong!</label>
    
    <Button variant="dark" @click="handleReload">Reload</Button>
  </div>
</template>
<script>
import { getCurrentInstance } from 'vue'
import Button from '@common/Button'

export default {
  components: {
    Button
  },
  setup() {
    const { parent } = getCurrentInstance()

    const handleReload = () => {
      console.log('Reaload')
      parent.emit('onFailedFetchHandler')
    }

    return {
      handleReload
    }
  }
}
</script>
