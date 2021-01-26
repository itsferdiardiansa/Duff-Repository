<template>
  <div class="create-form">
    <Card class="p-4">
      <div class="px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
        <div class="form-group">
          <label class="form-control-label" for="grid-first-name">
            Partner Name
          </label>
          <div class="w-full flex">
            <input
              class="form-control"
              type="text"
              placeholder="Partner Name"
            />

            <div class="w-full flex items-center ml-6">
              <input type="checkbox" id="checkbox" />
              <label class="ml-2" for="checkbox">Active</label>
            </div>
          </div>
        </div>

        <div class="form-group">
          <label class="form-control-label" for="grid-first-name">
            LDP ID
          </label>
          <input class="form-control" type="text" placeholder="LDP ID" />
        </div>

        <div class="form-group">
          <label class="form-control-label" for="grid-first-name">
            Logo Image
          </label>
          <input class="w-full" type="file" />
        </div>

        <div class="form-group">
          <label class="form-control-label" for="grid-first-name">
            Tagline
          </label>
          <input class="form-control" type="text" placeholder="Tagline" />
        </div>

        <div class="form-group">
          <label class="form-control-label" for="grid-first-name">
            URL Site
          </label>
          <input class="form-control" type="text" placeholder="URL Site" />
        </div>

        <div class="form-group">
          <label class="form-control-label" for="grid-first-name">
            Short Description
          </label>
          <textarea class="w-full form-control" rows="10"></textarea>
        </div>

        <div class="form-group">
          <label class="form-control-label" for="grid-first-name">
            Hero Image
          </label>
          <input class="w-full" type="file" />
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
