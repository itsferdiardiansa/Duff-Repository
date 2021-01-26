<template>
  <div class="create-form">
    <Card class="p-4">
      <div class="px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
        <div class="pb-6">
          <h3 class="font-black text-2xl">Thematic Content</h3>
        </div>

        <div>
          <div class="form-group">
            <label class="form-control-label" for="grid-first-name">
              Thematic Name
            </label>
            <input class="form-control" type="text" placeholder="Title" />
          </div>

          <div class="form-group">
            <label class="form-control-label" for="grid-first-name">
              Header Text
            </label>
            <input class="form-control" type="text" />
          </div>

          <div class="form-group">
            <label class="form-control-label" for="grid-first-name">
              Description Text
            </label>
            <textarea class="w-full form-control" rows="5"></textarea>
          </div>

          <div class="form-group">
            <label class="form-control-label" for="grid-first-name">
              Custom Content
            </label>
            <textarea class="w-full form-control" rows="5"></textarea>
          </div>
        </div>
      </div>

      <div class="px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
        <div class="py-6">
          <h3 class="font-black text-2xl">Thematic Page Info</h3>
        </div>

        <div>
          <div class="form-group">
            <label class="form-control-label" for="grid-first-name">
              Path URL
            </label>
            <input
              class="form-control"
              type="text"
              placeholder="Path Thematic Page"
            />
          </div>

          <div class="form-group">
            <label class="form-control-label" for="grid-first-name">
              Meta Title
            </label>
            <input
              class="form-control"
              type="text"
              placeholder="Blog Meta Keyword"
            />
          </div>

          <div class="form-group">
            <label class="form-control-label" for="grid-first-name">
              Custom Footer
            </label>
            <div class="w-full">
              <select class="w-1/4 border py-2 px-4">
                <option selected>Yes</option>
                <option selected>No</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div class="px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
        <div class="py-6">
          <h3 class="font-black text-2xl">Thematic Page Image</h3>
        </div>

        <div>
          <div class="form-group">
            <label class="form-control-label" for="grid-first-name">
              Desktop Banner
            </label>
            <input class="w-full" type="file" />
          </div>

          <div class="form-group">
            <label class="form-control-label" for="grid-first-name">
              Mobile Banner
            </label>
            <input class="w-full" type="file" />
          </div>

          <div class="form-group">
            <label class="form-control-label" for="grid-first-name">
              Custom Footer
            </label>
            <input class="w-full" type="file" />
          </div>

          <div style="margin-left: 20%">
            <Button label="Save" variant="dark" />
          </div>
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
