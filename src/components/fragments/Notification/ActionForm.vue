<template>
  <Form ref="formEl" :model="state.form" @submit="handleSubmit">
    <FormControl
      label="Title"
      :rules="{
        title: [{ required: true, message: 'Title is required' }],
      }"
    >
      <Input placeholder="Title" v-model="state.form.title" autofocus />
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
      label="Link"
      :rules="{
        link: [{ required: true, message: 'Link is required' }],
      }"
    >
      <Input placeholder="Link" v-model="state.form.link" />
    </FormControl>

    <FormControl
      label="Action Text"
      :rules="{
        action_text: [{ required: true, message: 'Action text is required' }],
      }"
    >
      <Input placeholder="Link" v-model="state.form.action_text" />
    </FormControl>

    <FormControl :offset="3">
      <Button
        type="submit"
        :label="isCreate ? 'Create' : 'Update'"
        :variant="isCreate ? 'dark' : 'warning'"
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

export default {
  name: 'NotificationActionForm',
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
        description: '',
        link: '',
        action_text: '',
        background_color: '',
        text_color: '',
        action_text_color: '',
        is_active: '1',
        is_public: '1',
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
