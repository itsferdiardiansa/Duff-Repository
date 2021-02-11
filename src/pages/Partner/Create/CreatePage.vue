<template>
  <Card class="w-full">
    <Form :isFetching="requestStatus.fetch" :onSubmitFn="handleSubmit">
      <FormItem label="Partner Name">
        <Input
          placeholder="Partner Name"
          v-model="state.form.name"
          autofocus
          reqiured
        />
      </FormItem>

      <FormItem label="LDP ID">
        <Input placeholder="LDP ID" v-model="state.form.ldp_id" />
      </FormItem>

      <FormItem label="Logo">
        <Input type="file" name="logo" @change="handleFileInput" />
      </FormItem>

      <FormItem label="Tagline">
        <Input placeholder="Tagline" v-model="state.form.tagline" />
      </FormItem>

      <FormItem label="URL Site">
        <Input placeholder="URL Site" v-model="state.form.site" />
      </FormItem>

      <FormItem label="Short Description">
        <Textarea v-model="state.form.description" />
      </FormItem>

      <FormItem label="Hero">
        <Input type="file" name="hero" @change="handleFileInput" />
      </FormItem>

      <FormItem>
        <Button
          class="w-28"
          :label="isCreateForm ? 'Create' : 'Update'"
          :variant="isCreateForm ? 'dark' : 'warning'"
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
import Form, { FormItem, Input, Textarea } from '@common/Form'
import Card from '@common/Card'
import Button from '@common/Button'
import { toBase64 } from '@util/imageProcessing'

export default {
  components: {
    Card,
    Button,
    Form,
    FormItem,
    Input,
    Textarea,
  },
  setup() {
    const store = useStore()
    const route = useRoute()
    const isCreateForm = ref(true)
    const state = reactive({
      form: {
        name: '',
        tagline: '',
        site: '',
        description: '<p>Text</p>',
        position: '1',
        ldp_id: '',
        is_active: '1',
        logo: '',
        hero: '',
      },
    })

    const requestStatus = computed(() => {
      return store.getters['partner/getRequestStatus']
    })

    const handleSubmit = () => {
      unref(isCreateForm) ? postData() : updateData()
    }

    const postData = () => {
      store.dispatch('partner/postData', {
        data: unref(state.form),
        action: 'form.create',
        redirectUrl: '/partner',
        status: 'success',
      })
    }

    const updateData = () => {
      store.dispatch('partner/updateData', {
        data: unref(state.form),
        action: 'form.update',
        redirectUrl: '/partner',
        status: 'success',
      })
    }

    const handleFileInput = async e => {
      const name = e.target.name
      const file = e.target.files[0]

      state.form[name] = btoa(await toBase64(file))
    }

    onMounted(() => {
      if (route.path === '/partner/update') {
        isCreateForm.value = false

        state.form = {
          ...unref(state.form),
          ...JSON.parse(route.params?.data),
        }
      }
    })

    return {
      state,
      isCreateForm,
      handleSubmit,
      handleFileInput,
      requestStatus,
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
