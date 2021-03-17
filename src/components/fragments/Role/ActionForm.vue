<template>
  <pre>
    <!-- {{
      JSON.stringify(state.form, null, 2)
    }} -->
  </pre>
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
      label="Privileges"
      :rules="{
        privileges: [{ required: true, message: 'Privileges is required' }],
      }"
    >
      <div>
        <template v-if="privilegesRequestStatus.error.status">
          <Button
            variant="orange"
            :icon="['fa', 'redo-alt']"
            @click="fetchPrivileges"
            :pill="true"
          />
          <span class="ml-2">We failed to load privileges</span>
        </template>
        <template v-else-if="privilegesRequestStatus.fetch">
          <RectSkeleton width="20%" height="25px" :rounded="true" />
        </template>
        <template v-else>
          <Checkbox
            class="grid grid-cols-6 gap-1"
            type="button"
            variant="dark"
            keyname="id"
            :items="privilegesList"
            v-model="state.form.privileges"
          />
        </template>
      </div>
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
import Spinner from '@common/Loader/Spinner';
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
    Spinner,
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

    const privilegesRequestStatus = computed(() => {
      return store.getters['role/getPrivilegesRequestStatus'];
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
      fetchPrivileges,
      privilegesList,
      privilegesRequestStatus,
      handleSubmit,
    };
  },
};
</script>
