<template>
  <Form ref="formEl" :model="state.form" @submit="handleSubmit">
    <FormControl
      label="Role Name"
      :rules="{
        name: [{ required: true, message: 'Role name is required' }],
      }"
    >
      <Input placeholder="Role Name" v-model="state.form.name" autofocus />
    </FormControl>

    <FormControl
      label="Previleges"
      :rules="{
        privileges: [{ required: true, message: 'Privileges is required' }],
      }"
    >
      <Checkbox :items="[{ value: 101, label: 'Hero' }]" />
    </FormControl>

    <RectSkeleton height="15px" />
    <RectSkeleton height="15px" />
    <RectSkeleton height="15px" />

    <FormControl :colspan="3">
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
import Form, {
  FormControl,
  FileUpload,
  Input,
  Textarea,
  Checkbox,
} from '@common/Form';
import Button from '@common/Button';
import { Rect as RectSkeleton } from '@common/Skeleton';

export default {
  name: 'PartnerActionForm',
  components: {
    Button,
    Form,
    FormControl,
    FileUpload,
    Input,
    Textarea,
    Checkbox,
    RectSkeleton,
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
        privileges: [],
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

      if (data && !isCreate) state.form = { ...state.form, ...data };
    });

    return {
      formEl,
      state,
      handleSubmit,
    };
  },
};
</script>
