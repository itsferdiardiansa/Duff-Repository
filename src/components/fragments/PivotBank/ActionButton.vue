<template>
  <div class="flex justify-center">
    <div class="mr-2">
      <Button
        :data-title="data.path"
        size="sm"
        title="Edit"
      >
        <img svg-inline class="w-3" src="@icon/pencil.svg" />
      </Button>
    </div>
    <div class="mr-2">
      <Button
        :data-title="data.path"
        :textBold="true"
        @click="toggleClick"
        size="sm"
        variant="danger"
      >
        <img svg-inline class="w-4 h-4" src="@icon/delete.svg" />
      </Button>
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
    toggleClick: {
      type: Function,
      default: () => {}
    }
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
