<template>
  <div class="create-form">
    <Card class="p-4">
      <div class="px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
        <div class="form-group">
          <label class="form-control-label" for="grid-first-name">
            Role Name
          </label>
          <input class="form-control" type="text" />
        </div>

        <div class="form-group">
          <label class="form-control-label" for="grid-first-name">
            Previleges
          </label>

          <div class="w-full">
            <div>
              <div class="flex items-center">
                <input
                  id="checkboxCustom101"
                  type="checkbox"
                  value="101"
                  class="checkbox-template"
                  name="id-privileges"
                />
                <label class="ml-2" for="checkboxCustom101">Hero Menu</label>
              </div>

              <div class="flex items-center">
                <input
                  id="checkboxCustom102"
                  type="checkbox"
                  value="102"
                  class="checkbox-template"
                  name="id-privileges"
                />
                <label class="ml-2" for="checkboxCustom102">Partner Menu</label>
              </div>

              <div class="flex items-center">
                <input
                  id="checkboxCustom103"
                  type="checkbox"
                  value="103"
                  class="checkbox-template"
                  name="id-privileges"
                />
                <label class="ml-2" for="checkboxCustom103">Section Menu</label>
              </div>
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
      @apply w-full border rounded py-2 px-4;
    }
  }
}
</style>
