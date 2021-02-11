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
          v-model="state.form.title"
          autofocus 
        />
      </FormItem>

      <FormItem label="Description">
        <Input 
          placeholder="Description"
          v-model="state.form.description"
        />
      </FormItem>

      <FormItem label="Link">
        <Input 
          placeholder="Link"
          v-model="state.form.link"
        />
      </FormItem>

      <FormItem label="Action Text">
        <Input 
          placeholder="Action text"
          v-model="state.form.action_text"
        />
      </FormItem>

      <FormItem>
        <Button 
          class="w-28"
          :label="(isCreateForm) ? 'Create': 'Update'" 
          :variant="(isCreateForm) ? 'dark' : 'warning'"
          :icon="['fa', 'save']" 
          :bold="true"
        />
      </FormItem>
    </Form>
  </Card>
</template>
<script>
import { computed, onMounted, reactive, ref, unref } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import Form, { FormItem, Input } from '@common/Form'
import Card from '@common/Card'
import Button from '@common/Button'

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
    const route = useRoute()
    const isCreateForm = ref(true)
    const state = reactive({
      form: {
        title: '',
        description: '',
        link: '',
        action_text: '',
        background_color: '',
        text_color: '',
        action_text_color: '',
        is_active: "1",
        is_public: "1"
      }
    })

    const requestStatus = computed(() => {
      return store.getters['notification/getRequestStatus']
    })
    
    const handleSubmit = () => {
      unref(isCreateForm) ? postData() : updateData()
    }

    const postData = () => {
      store.dispatch('notification/postData', {
        data: unref(state.form),
        action: 'form.create',
        redirectUrl: '/notification',
        status: 'success',
      })
    }

    const updateData = () => {
      store.dispatch('notification/updateData', {
        data: unref(state.form),
        action: 'form.update',
        redirectUrl: '/notification',
        status: 'success',
      })
    }

    onMounted(() => {
      console.log(route)
      if(route.path === '/notification/update') {
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
      handleSubmit,
      requestStatus
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
