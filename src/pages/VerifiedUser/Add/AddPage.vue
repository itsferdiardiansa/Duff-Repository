<template>
  <div class="create-form">
    <Card class="p-4">
      <div class="px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
        <div class="pb-6">
          <h3 class="font-black text-2xl">Add Verified User</h3>
        </div>

        <div>
          <div class="form-group">
            <label class="form-control-label" for="grid-first-name">
              Organizer
            </label>
            <input
              class="form-control"
              type="text"
              placeholder="Organizer Name"
            />
          </div>
        </div>

        <div style="margin-left: 20%">
          <Button label="Save" variant="dark" />
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
