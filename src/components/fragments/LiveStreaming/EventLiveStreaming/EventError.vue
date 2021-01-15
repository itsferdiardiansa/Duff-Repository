<template>
  <div class="w-100 p-3 items-center col-span-5 flex flex-col items-center">
    <div class="w-96 overflow-hidden">
      <img svg-inline class="w-full h-auto" src="@icon/error.svg" />
    </div>

    <div clas="w-1.5 mt-40">
      <Button label="Try again" :handleClick="handleClick" />
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
    handleClick: {
      type: Function,
      default: () => {},
    },
  },
}
</script>
