<template>
  <Form ref="formEl" :model="state.form" @submit="handleSubmit">
    <FormControl
      label="Name"
      :rules="{
        name: [{ required: true, message: 'Footer name is required' }],
      }"
    >
      <Input placeholder="Footer name" v-model="state.form.name" autofocus />
    </FormControl>

    <FormControl
      label="Position"
      :colspan="3"
      :rules="{
        position: [{ required: true, message: 'Position is required' }],
      }"
    >
      <Select
        placeholder="Please select position"
        keyname="value"
        v-model="state.form.position"
        :items="[
          { value: '0', label: 'Position Top' },
          { value: '1', label: 'Position Right' },
          { value: '2', label: 'Position Bottom' },
          { value: '3', label: 'Position Left' },
        ]"
      />
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
import Form, { FormControl, Input, Select } from '@common/Form';
import Button from '@common/Button';

export default {
  name: 'PartnerActionForm',
  components: {
    Button,
    Form,
    FormControl,
    Input,
    Select,
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
        position: '',
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
