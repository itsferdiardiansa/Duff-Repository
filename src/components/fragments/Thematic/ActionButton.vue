<template>
  <div class="flex justify-center">
    <div class="mr-2">
      <Button
        :data-title="data.path"
        :onClick="handleClick(data)"
        size="xs"
        variant="warning"
      >
        <img svg-inline class="w-4 fill-current text-gray-800" src="@icon/pencil.svg" />
        <span class="ml-2">Edit</span>
      </Button>
    </div>

    <div class="mr-2">
      <Button 
        :data-title="data.path"
        size="xs"
      >
        <img svg-inline class="w-4 h-4 fill-current text-gray-800" src="@icon/delete.svg" />
        <span class="ml-2">Delete</span>
      </Button>
    </div>

    <div>
      <Button 
        :data-title="data.path"
        size="xs"
        variant="dark"
      >
        <span>View</span>
      </Button>
    </div>
  </div>
</template>
<script>
import Button from '@common/Button'

export default {
  components: {
    Button
  },
  props: {
    data: {
      type: Object,
      default: () => { }
    }
  },
  setup() {
    const handleClick = () => {
      alert('Clicked ...')
    }

    return {
      handleClick: () => handleClick
    }
  }
}
</script>