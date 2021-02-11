<template>
  <Card class="w-full">
    <Form
      class="w-10/12"
      :isFetching="requestStatus.fetch" 
      :onSubmitFn="handleSubmit"
    >
      <FormItem label="Title">
        <Input 
          placeholder="Title" 
          v-model="state.title"
        />
      </FormItem>

      <FormItem label="URL">
        <Input 
          placeholder="URL" 
          v-model="state.button_url"
        />
      </FormItem>

      <FormItem label="Banner (1080x240)">
        <Input 
          type="file"
          name="banner"
          @change="handleFileInput"
        />
      </FormItem>

      <FormItem label="Mobile Banner (360x160)">
        <Input 
          type="file"
          name="banner_mobile"
          @change="handleFileInput"
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
import { computed, reactive, unref } from 'vue'
import Card from '@common/Card'
import Button from '@common/Button'
import Form, { FormItem, Input } from '@common/Form'
import { useStore } from 'vuex'

const toBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = () => resolve(reader.result)
  reader.onerror = error => reject(error)
})

export default {
  components: {
    Card,
    Button,
    Form, 
    FormItem, 
    Input
  },
  setup() {
    const store = useStore()

    const state = reactive({
      title: '',
      button_url: '',
      banner: '',
      banner_mobile: ''
    })

    const requestStatus = computed(() => {
      return store.getters['hero/getRequestStatus']
    })

    const handleSubmit = () => {
      store.dispatch('hero/postData', {
        data: unref(state),
        action: 'form.create',
        redirectUrl: '/hero',
        status: 'success',
      })
    }

    const handleFileInput = async e => {
      const name = e.target.name
      const file = e.target.files[0]

      state[name] = await btoa(toBase64(file))
    }
 
    return {
      state,
      handleSubmit,
      handleFileInput,
      requestStatus
    }
  }
}
</script>
