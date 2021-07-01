<template>
  <Form ref="formEl" :model="state.form" @submit="handleSubmit">
    <FormControl
      label="Title"
      :rules="{
        title: [{ required: true, message: 'Title is required' }],
      }"
    >
      <Input
        placeholder="Title"
        name="Title"
        v-model="state.form.title"
        autofocus
      />
    </FormControl>

    <FormControl
      label="Button URL"
      :rules="{
        button_url: [
          { required: true, message: 'Button URL is required' },
          { pattern: urlPattern, message: 'Please check the URL format' },
        ],
      }"
    >
      <Input
        placeholder="Button URL"
        v-model="state.form.button_url"
        autofocus
      />
    </FormControl>

    <FormControl
      label="Description"
      :rules="{
        description: [{ required: true, message: 'Description is required' }],
      }"
    >
      <Textarea name="description" v-model="state.form.description" />
    </FormControl>
    <FormControl
      label="Banner"
      :rules="{
        banner: [{ required: true, message: 'Banner is required' }],
      }"
    >
      <FileUpload name="banner" v-model="state.form.banner" />
    </FormControl>

    <FormControl
      label="Banner Mobile"
      :rules="{
        banner_mobile: [
          { required: true, message: 'Banner Mobile is required' },
        ],
      }"
    >
      <FileUpload name="banner_mobile" v-model="state.form.banner_mobile" />
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
  </Form>
</template>
<script>
/* eslint-disable */
import { onMounted, reactive, ref, unref } from 'vue';
import Form, { FormControl, FileUpload, Input, Textarea } from '@common/Form';
import Button from '@common/Button';
import { urlPattern } from '@util/pattern';

export default {
  name: 'HeroActionForm',
  components: {
    Button,
    Form,
    FormControl,
    FileUpload,
    Input,
    Textarea,
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
        title: '',
        button_url: '',
        banner: '',
        banner_mobile: '',
        position: 0,
        is_active: 0,
        banner_type: 'image',
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
      urlPattern,
    };
  },
};
</script>
