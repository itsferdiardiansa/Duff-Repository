<template>
  <div class="flex justify-center">
    <div class="mr-2">
      <Button
        size="sm"
        variant="dark"
        :icon="['fa', 'mark']"
        @click="handleClick(data)"
      />
    </div>
  </div>
</template>
<script>
import Button from '@common/Button'

export default {
  components: {
    Button,
  },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  setup() {
    const handleClick = data => {
      console.log('Clicked ...', data)
    }

    return {
      handleClick,
    }
  },
}
</script>
