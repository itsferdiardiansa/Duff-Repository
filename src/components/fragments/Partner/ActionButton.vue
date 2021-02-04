<template>
  <div class="flex justify-center">
    <div class="mr-2">
      <Button
        :data-title="data.path"
        size="sm"
        title="Edit"
        @click="handleClick(data)"
      >
        <img svg-inline class="w-3" src="@icon/pencil.svg" />
      </Button>
    </div>
    <div class="mr-2">
      <Button :data-title="data.path" :textBold="true" size="sm" variant="dark">
        <img svg-inline class="w-4 h-4" src="@icon/delete.svg" />
      </Button>
    </div>

    <div class="mr-2">
      <Button :data-title="data.path" size="sm" variant="warning">
        <a :href="data.site" target="_blank">View</a>
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
