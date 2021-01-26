<template>
  <div class="create-form">
    <Card class="p-4">
      <div class="px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
        <div class="form-group">
          <label class="form-control-label" for="grid-first-name">
            Title
          </label>

          <div class="w-full ml-11">
            <input class="form-control" type="text" placeholder="" />
          </div>

          <div class="w-1/8 flex ml-6">
            <div class="w-full flex items-center">
              <input type="checkbox" id="checkbox" />
              <label class="ml-2" for="checkbox">Active</label>
            </div>

            <div class="w-full flex items-center ml-6">
              <input type="checkbox" id="checkbox" />
              <label class="ml-2" for="checkbox">Public</label>
            </div>
          </div>
        </div>

        <div class="form-group">
          <label class="form-control-label" for="grid-first-name"> Link </label>
          <input class="form-control" type="text" placeholder="Link" />
        </div>

        <div class="form-group">
          <label class="form-control-label" for="grid-first-name">
            Text Link
          </label>
          <input class="form-control" type="text" placeholder="Text Link" />
        </div>

        <div class="form-group">
          <label class="form-control-label" for="grid-first-name">
            Data Expired
          </label>

          <div class="w-full flex">
            <div>
              <Datetime
                class="form-control focus:outline-none"
                v-model="date"
              />
            </div>

            <div class="ml-6">
              <Datetime
                class="form-control focus:outline-none"
                v-model="date"
              />
            </div>
          </div>
        </div>

        <div class="form-group">
          <label class="form-control-label" for="grid-first-name">
            Content
          </label>
          <textarea class="w-full form-control" rows="5"></textarea>
        </div>

        <div class="form-group"></div>

        <div style="margin-left: 20%">
          <Button label="Create" variant="dark" />
        </div>
      </div>
    </Card>
  </div>
</template>
<script>
import { ref } from 'vue'
import Card from '@common/Card'
import Button from '@common/Button'
import Datetime from 'vue3-datepicker'

export default {
  components: {
    Card,
    Button,
    Datetime,
  },
  setup() {
    let date = ref(new Date())

    return {
      date,
    }
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
