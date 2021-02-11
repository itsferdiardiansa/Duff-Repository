<template>
  <Card class="w-full">
    <Form 
      class="w-9/12"
      :isFetching="requestStatus.fetch" 
      :onSubmitFn="handleSubmit"
    >
      <FormItem label="Name">
        <Input 
          placeholder="Footer name"
          v-model="state.form.name"
          autofocus
        />
      </FormItem>

      <FormItem label="Position">
        <Select 
          class="w-4/12"
          v-model="state.form.position" 
          :items="[
            {value: 0, text: 'Position Top'},
            {value: 1, text: 'Position Right'},
            {value: 2, text: 'Position Bottom'},
            {value: 3, text: 'Position Left'}
          ]" 
        />
      </FormItem>

      <FormItem>
        <Button 
          class="w-28"
          :label="isCreateForm ? 'Create': 'Update'" 
          :variant="isCreateForm ? 'dark' : 'warning'"
          :icon="['fa', 'save']"
          :bold="true" 
        />
      </FormItem>
    </Form>
  </Card>
</template>
<script>
/* eslint-disable */
import { reactive, unref, ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import Form, { FormItem, Input, Select } from '@common/Form'
import Card from '@common/Card'
import Button from '@common/Button'
import { useRoute, useRouter } from 'vue-router'

export default {
  components: {
    Form,
    FormItem,
    Input,
    Card,
    Button,
    Select
  },
  setup() {
    const store = useStore()
    const route = useRoute()
    const isCreateForm = ref(true)
    const state = reactive({
      form: {
        name: '',
        position: 1
      }
    })

    const requestStatus = computed(() => {
      return store.getters['footer/getRequestStatus']
    })

    const handleSubmit = () => {
      unref(isCreateForm) ? postData() : updateData()
    }

    const postData = () => {
      store.dispatch('footer/postData', {
        data: unref(state.form),
        action: 'form.create',
        redirectUrl: '/footer',
        status: 'success',
      })
    }

    const updateData = () => {
      store.dispatch('footer/updateData', {
        data: unref(state.form),
        action: 'form.update',
        redirectUrl: '/footer',
        status: 'success',
      })
    }

    onMounted(() => {
      console.log(route.path)
      if(route.path === '/footer/update') {
        isCreateForm.value = false

        state.form = {
          ...unref(state.form),
          ...JSON.parse(route.params?.data)
        }

      }
    })

    return {
      state,
      isCreateForm,
      requestStatus,
      handleSubmit
    }
  }
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
