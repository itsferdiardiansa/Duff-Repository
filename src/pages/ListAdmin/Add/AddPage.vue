<template>
  <Card class="w-full">
    <Form>
      <FormItem label="Name">
        <Input placeholder="Name" v-model="state.form.name" autofocus />
      </FormItem>

      <FormItem label="Email">
        <Input placeholder="Email" v-model="state.form.email" />
      </FormItem>

      <FormItem label="Role">
        <Select
          class="w-4/12"
          v-model="state.form.status"
          :items="state.statusList"
        />
      </FormItem>

      <FormItem>
        <Button
          type="submit"
          variant="dark"
          label="Create"
          class="w-28"
          :icon="['fa', 'save']"
          :bold="true"
        />
      </FormItem>
    </Form>
  </Card>
</template>
<script>
import { reactive } from 'vue'
import Card from '@common/Card'
import Button from '@common/Button'
import Form, { FormItem, Input, Select } from '@common/Form'

export default {
  components: {
    Card,
    Button,
    Form,
    FormItem,
    Input,
    Select,
  },
  setup() {
    const state = reactive({
      form: {
        name: '',
        email: '',
        status: 1,
      },
      statusList: [
        { value: 1, text: 'Admin' },
        { value: 2, text: 'Marketing' },
      ],
    })

    return {
      state,
    }
  },
}
</script>
