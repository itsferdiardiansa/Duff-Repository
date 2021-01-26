<template>
  <div class="create-form">
    <Card class="p-4">
      <div class="px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
        <div class="pb-6">
          <h3 class="font-black text-2xl">Add Blacklist Word</h3>
        </div>

        <div class="form-group">
          <label class="form-control-label" for="grid-first-name">
            Blacklist Word
          </label>
          <input class="form-control" type="text" />
        </div>

        <div class="form-group">
          <label class="form-control-label" for="grid-first-name">
            Blacklist Word
          </label>

          <div class="w-full flex items-center">
            <div class="flex items-center">
              <input
                type="radio"
                id="field_position_1"
                name="field_position"
                class="custom-control-input"
                value="0"
                required=""
              />
              <label class="ml-4" for="field_position_1">Event Name</label>
            </div>
            <div class="flex items-center ml-4">
              <input
                type="radio"
                id="field_position_2"
                name="field_position"
                class="custom-control-input"
                value="1"
                required=""
              />
              <label class="ml-4" for="field_position_2"
                >Event Description &amp; Tnc</label
              >
            </div>
          </div>
        </div>

        <div style="margin-left: 20%">
          <Button label="Create" variant="dark" />
        </div>
      </div>
    </Card>
  </div>
</template>
<script>
import Card from '@common/Card'
import Button from '@common/Button'

export default {
  components: {
    Card,
    Button,
  },
}
</script>
<style lang="scss" scoped>
.create-form {
  @apply w-full;

  .form-group {
    @apply flex items-center mb-6;

    .form-control-label {
      @apply w-1/4 block uppercase tracking-wide text-xs font-bold mb-2;
    }

    .form-control {
      @apply w-full border rounded py-3 px-4;
    }
  }
}
</style>
