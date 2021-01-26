<template>
  <div class="content-header flex items-center justify-between">
    <div class="flex items-center">
      <div class="title">
        <h2 class="font-bold text-2xl">List Event</h2>
      </div>
    </div>

    <div class="float-right flex">
      <TextField class="mr-4 border border-gray-400" />

      <Button :textBold="true" class="w-40" variant="primary">
        Search Event
      </Button>
    </div>
  </div>
</template>
<script>
import Button from '@common/Button'
import TextField from '@common/TextField'

export default {
  components: {
    Button,
    TextField,
  },
}
</script>
