<template>
  <Form ref="formEl" :model="state.form" @submit="handleSubmit">
    <FormControl
      label="LDP ID"
      :rules="{
        ldp_id: [{ required: true, message: 'LDP ID is required' }],
      }"
    >
      <Input
        placeholder="LDP ID"
        name="ldp_id"
        v-model="state.form.ldp_id"
        autofocus
      />
    </FormControl>

    <FormControl
      label="Logo"
      :rules="{
        logo: [{ required: true, message: 'Logo is required' }],
      }"
    >
      <FileUpload name="logo" v-model="state.form.logo" />
    </FormControl>

    <FormControl
      label="Tagline"
      :rules="{
        tagline: [{ required: true, message: 'Tagline is required' }],
      }"
    >
      <Input placeholder="Tagline" v-model="state.form.tagline" />
    </FormControl>

    <FormControl
      label="URL Site"
      :rules="{
        site: [{ required: true, message: 'URL Site is required' }],
      }"
    >
      <Input placeholder="URL Site" name="url_site" v-model="state.form.site" />
    </FormControl>

    <FormControl
      label="Short Description"
      :rules="{
        description: [{ required: true, message: 'Description is required' }],
      }"
    >
      <Textarea name="description" v-model="state.form.description" />
    </FormControl>

    <FormControl
      label="Hero"
      :rules="{
        hero: [{ required: true, message: 'Hero is required' }],
      }"
    >
      <FileUpload name="hero" v-model="state.form.hero" />
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
  name: 'PartnerActionForm',
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
        tagline: '',
        site: '',
        description: '',
        position: '1',
        ldp_id: '',
        is_active: '1',
        logo: '',
        hero: '',
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
