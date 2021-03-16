<template>
  <Form ref="formEl" :model="state.form" @submit="handleSubmit">
    <FormControl
      label="Name"
      :rules="{
        name: [{ required: true, message: 'Name is required' }],
      }"
    >
      <Input placeholder="Role Name" v-model="state.form.name" autofocus />
    </FormControl>

    <FormControl
      label="Email"
      :rules="{
        email: [
          { required: true, message: 'Email is required' },
          { pattern: emailPattern, message: 'Please check the email format' },
        ],
      }"
    >
      <Input placeholder="Email" v-model="state.form.email" autofocus />
    </FormControl>

    <FormControl
      label="Role"
      :colspan="2"
      :rules="{
        id_role: [{ required: true, message: 'Role is required' }],
      }"
    >
      <Select
        type="button"
        variant="dark"
        keyname="id"
        placeholder="Please select role"
        :items="state.roleList"
        v-model="state.form.id_role"
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
import Button from '@common/Button';
import { Rect as RectSkeleton } from '@common/Skeleton';
import { emailPattern } from '@util/pattern';

export default {
  name: 'AdminActionForm',
  components: {
    Button,
    Form,
    FormControl,
    FileUpload,
    Input,
    Textarea,
    Select,
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
        email: '',
        id_role: 1,
      },
      roleList: [
        { id: 1, label: 'Admin' },
        { id: 2, label: 'Marketing' },
      ],
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

      if (data && !isCreate) {
        state.form = data;
      }
    });

    return {
      formEl,
      state,
      handleSubmit,
      emailPattern,
    };
  },
};
</script>
