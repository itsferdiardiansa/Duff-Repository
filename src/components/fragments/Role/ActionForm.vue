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
      <Checkbox
        type="button"
        variant="dark"
        keyname="id"
        :items="privilegesList"
        v-model="state.form.privileges"
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
import {
  computed,
  nextTick,
  onMounted,
  reactive,
  ref,
  unref,
  watch,
} from 'vue';
import Form, {
  FormControl,
  FileUpload,
  Input,
  Textarea,
  Checkbox,
} from '@common/Form';
import Button from '@common/Button';
import { Rect as RectSkeleton } from '@common/Skeleton';
import { useStore } from 'vuex';

export default {
  name: 'RoleActionForm',
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
    const store = useStore();
    const state = reactive({
      form: {
        name: '',
        privileges: [],
      },
    });

    const privilegesList = computed(() => {
      const privileges = store.getters['role/getPrivilegesItems'];

      const filtered = Object.keys(privileges).map(key => ({
        id: key,
        label: privileges[key],
      }));

      return filtered;
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

    const fetchPrivileges = () => {
      store.dispatch('role/fetchPrivileges');
    };

    onMounted(() => {
      const { data, isCreate } = props;

      if (data && !isCreate) {
        state.form = data;
        state.form.privileges = [];
      }

      fetchPrivileges();
    });

    return {
      formEl,
      state,
      privilegesList,
      handleSubmit,
    };
  },
};
</script>
