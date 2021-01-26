<template>
  <div class="create-form">
    <Card class="p-4">
      <div class="px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
        <div class="form-group">
          <label class="form-control-label" for="grid-first-name">
            Status
          </label>
          <div class="w-full">
            <select class="w-1/4 border py-2 px-4">
              <option selected>Active</option>
              <option selected>Inactive</option>
            </select>
          </div>
        </div>

        <div class="form-group">
          <label class="form-control-label" for="grid-first-name">
            Section Name
          </label>
          <input class="form-control" type="text" placeholder="Section Name" />
        </div>

        <div class="form-group">
          <label class="form-control-label" for="grid-first-name">
            Category
          </label>
          <div class="w-full">
            <select class="w-1/4 border py-2 px-4">
              <option selected>Transportation</option>
              <option>Concert</option>
            </select>
          </div>
        </div>

        <div class="form-group">
          <label class="form-control-label" for="grid-first-name">
            Choose Events
          </label>
          <input
            class="form-control"
            type="text"
            placeholder="Search by name"
          />
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
