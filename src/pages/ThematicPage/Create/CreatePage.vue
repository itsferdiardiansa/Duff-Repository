<template>
  <Card class="w-full">
    <Form 
        class="w-10/12"
        :isFetching="requestStatus.fetch" 
        :onSubmitFn="handleSubmit"
      >
        <Section title="Thematic Content">
          <template #content>
            <FormItem label="Thematic Name">
              <Input 
                placeholder="Thematic Name"
                v-model="state.form.name"
                autofocus 
              />
            </FormItem>

            <FormItem label="Header Text">
              <Input 
                placeholder="Header Text"
                v-model="state.form.header_text"
                reqiured
              />

              <ColorPicker 
                :inline="false"
                v-model="state.form.header_text_color"
              />
            </FormItem>

            <FormItem label="Description">
              <Textarea 
                v-model="state.form.description_text" 
              />

              <ColorPicker 
                :inline="false"
                v-model="state.form.description_text_color"
              />
            </FormItem>

            <FormItem label="Custom Content">
              <Textarea 
                v-model="state.form.custom_content" 
              />
            </FormItem>
          </template>
        </Section>

        <Section title="Thematic Page Info">
          <template #content>
            <FormItem label="Meta Title">
              <Input 
                placeholder="Meta title"
                v-model="state.form.meta_title"
                autofocus 
              />
            </FormItem>

            <FormItem label="Path">
              <Input 
                placeholder="Path"
                v-model="state.form.path"
                autofocus 
              />
            </FormItem>

            <FormItem label="Custom Footer">
              <Select 
                class="w-28"
                :items="[{value: '0', text: 'No'}, {value: '1', text: 'Yes'}]"
                v-model="state.form.custom_footer"
              />
            </FormItem>
          </template>
        </Section>

        <Section title="Thematic Page Image">
          <template #content>
            <FormItem label="Header Image">
              <Input 
                type="file"
                name="header_image"
                @change="handleFileInput"
              />
            </FormItem>

            <FormItem label="Header Image Mobile">
              <Input 
                type="file"
                name="header_image_mobile"
                @change="handleFileInput"
              />
            </FormItem>

            <FormItem label="Footer Image">
              <Input 
                type="file"
                name="custom_footer_image"
                @change="handleFileInput"
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
          </template>
        </Section>
    </Form>
  </Card>
</template>
<script>
/* eslint-disable */
import { reactive, ref, computed, unref, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import Card from '@common/Card'
import Form, { FormItem, Input, Textarea, Select } from '@common/Form'
import Section from '@common/Layout/Section'
import Button from '@common/Button'
import ColorPicker from '@common/ColorPicker'
import { toBase64 } from '@util/imageProcessing'

export default {
  components: {
    Card,
    Button,
    Form, 
    FormItem,
    Input,
    Textarea,
    Select,
    ColorPicker,
    Section
  },
  setup() {
    const store = useStore()
    const route = useRoute()
    const isCreateForm = ref(true)
    const state = reactive({
      form: {
        name: '',
        header_image: '',
        header_image_mobile: '', 
        header_text: '',
        header_text_color: '',
        description_text: '',
        description_text_color: '',
        meta_title: '',
        path: '',
        custom_footer: "0",
        custom_footer_image: '',
        custom_content: ''
      }
    })
    
    const requestStatus = computed(() => {
      return store.getters['thematicPage/getRequestStatus']
    })

    const handleSubmit = () => {
      unref(isCreateForm) ? postData() : updateData()
    }

    const postData = () => {
      store.dispatch('thematicPage/postData', {
        data: unref(state.form),
        action: 'form.create',
        redirectUrl: '/thematic-page',
        status: 'success',
      })
    }

    const updateData = () => {
      store.dispatch('thematicPage/updateData', {
        data: unref(state.form),
        action: 'form.update',
        redirectUrl: '/thematic-page',
        status: 'success',
      })
    }

    const handleFileInput = async e => {
      const name = e.target.name
      const file = e.target.files[0]

      state[name] = btoa(await toBase64(file))
    }

    onMounted(() => {
      setTimeout(() => {
        if(route.path === '/thematic-page/update') {
          state.form = {
            ...unref(state.form),
            ...JSON.parse(route.params?.data)
          }
  
          isCreateForm.value = false
        }
      }, 2000)
    })

    return {
      state,
      isCreateForm,
      handleSubmit,
      handleFileInput,
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
