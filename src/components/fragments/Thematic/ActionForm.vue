<template>
  <Form ref="formEl" :model="state.form" @submit="handleSubmit">
    <Section title="Thematic Content">
      <template #content>
        <FormControl
          label="Thematic Name"
          :rules="{
            name: [{ required: true, message: 'Thematic name is required' }],
          }"
        >
          <Input
            placeholder="Thematic Name"
            v-model="state.form.name"
            autofocus
          />
        </FormControl>

        <FormControl
          label="Header Text"
          :rules="{
            header_text: [
              { required: true, message: 'Header text is required' },
            ],
          }"
        >
          <Input
            placeholder="Header Text"
            v-model="state.form.header_text"
            reqiured
          />
        </FormControl>

        <FormControl label="Header Text Color">
          <ColorPicker :inline="false" v-model="state.form.header_text_color" />
        </FormControl>

        <FormControl
          label="Description"
          :rules="{
            description_text: [
              { required: true, message: 'Description is required' },
            ],
          }"
        >
          <Textarea v-model="state.form.description_text" />
        </FormControl>

        <FormControl label="Description Color">
          <ColorPicker
            :inline="false"
            v-model="state.form.description_text_color"
          />
        </FormControl>

        <FormControl
          label="Custom Content"
          :rules="{
            custom_content: [
              { required: true, message: 'Custom content is required' },
            ],
          }"
        >
          <Textarea v-model="state.form.custom_content" />
        </FormControl>
      </template>
    </Section>

    <Section title="Thematic Page Info">
      <template #content>
        <FormControl
          label="Meta Title"
          :rules="{
            meta_title: [{ required: true, message: 'Meta title is required' }],
          }"
        >
          <Input
            placeholder="Meta title"
            v-model="state.form.meta_title"
            autofocus
          />
        </FormControl>

        <FormControl
          label="Path"
          :rules="{
            path: [{ required: true, message: 'Path is required' }],
          }"
        >
          <Input placeholder="Path" v-model="state.form.path" autofocus />
        </FormControl>

        <FormControl
          label="Custom Footer"
          :colspan="3"
          :rules="{
            custom_footer: [
              { required: true, message: 'Custom footer is required' },
            ],
          }"
        >
          <Select
            keyname="value"
            :items="[
              { value: '0', label: 'No' },
              { value: '1', label: 'Yes' },
            ]"
            v-model="state.form.custom_footer"
          />
        </FormControl>
      </template>
    </Section>

    <Section title="Thematic Page Image">
      <template #content>
        <FormControl
          label="Header Image"
          :rules="{
            header_image: [
              { required: true, message: 'Header image is required' },
            ],
          }"
        >
          <FileUpload name="header_image" v-model="state.form.header_image" />
        </FormControl>

        <FormControl
          label="Header Image Mobile"
          :rules="{
            header_image_mobile: [
              { required: true, message: 'Header image mobile is required' },
            ],
          }"
        >
          <FileUpload
            name="header_image_mobile"
            v-model="state.form.header_image_mobile"
          />
        </FormControl>

        <FormControl
          label="Footer Image"
          :rules="{
            custom_footer_image: [
              { required: true, message: 'Footer image is required' },
            ],
          }"
        >
          <FileUpload
            name="footer_image"
            v-model="state.form.custom_footer_image"
          />
        </FormControl>

        <FormControl :offset="3">
          <Button
            type="submit"
            variant="orange"
            :label="isCreate ? 'Create' : 'Update'"
            :icon="['fa', 'save']"
            :bold="true"
            :isLoading="isFetching"
          />
        </FormControl>
      </template>
    </Section>
  </Form>
</template>
<script>
/* eslint-disable */
import { onMounted, reactive, ref, unref } from 'vue';
import Form, {
  FormControl,
  FileUpload,
  Input,
  Textarea,
  Select,
} from '@common/Form';
import ColorPicker from '@common/ColorPicker';
import Button from '@common/Button';
import Section from '@common/Layout/Section';

export default {
  name: 'ThematicActionForm',
  components: {
    Button,
    Form,
    FormControl,
    FileUpload,
    Input,
    Textarea,
    ColorPicker,
    Select,
    Section,
  },
  emits: ['submit'],
  props: {
    data: {
      type: Object,
      default: () => {},
    },
    isCreate: {
      type: Boolean,
      default: true,
    },
    isFetching: {
      type: Boolean,
      default: false,
    },
    withValidation: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, { emit }) {
    const formEl = ref();
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
        custom_footer: '0',
        custom_footer_image: '',
        custom_content: '',
      },
    });

    const handleSubmit = () => {
      const { withValidation } = props;
      const form = unref(formEl);

      form.validate(valid => {
        if (valid || !withValidation) {
          emit('submit', state.form);
        }
      });
    };

    onMounted(() => {
      const { data, isCreate } = props;

      if (data && !isCreate) state.form = data;
    });

    return {
      formEl,
      state,
      handleSubmit,
    };
  },
};
</script>
