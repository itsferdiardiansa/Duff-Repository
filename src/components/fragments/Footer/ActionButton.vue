<template>
  <div class="flex justify-center">
    <div class="mr-2">
      <Button :data-title="data.path" :textBold="true" size="sm" variant="dark">
        <img svg-inline class="w-4 h-4" src="@icon/delete.svg" />
      </Button>
    </div>

    <div class="mr-2">
      <Button 
        label="Add Menu"
        size="sm" 
        variant="primary"
        :icon="['fa', 'plus']"
        @click="handleAddMenu(data)" 
      />
    </div>
  </div>
</template>
<script>
import Button from '@common/Button'
import { unref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  components: {
    Button
  },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  setup() {
    const router = useRouter()

    const handleClick = data => {
      console.log('Clicked ...', data)
    }

    const handleAddMenu = data => {
      const refData = unref(data)

      router.push({ name: 'Footer Menu Detail', query: { id: refData.hash_id } })
    }

    return {
      handleClick,
      handleAddMenu
    }
  },
}
</script>
