<template>
  <div class="w-8/12 text-left mt-10">
    <div class="font-black text-lg mb-4">State</div>

    <div class="">
      <div class="mb-4">
        <pre>
          {{ state }}
        </pre>
      </div>

      <Form ref="form" :model="state" @submit="onSubmit">
        <FormControl :offset="3" :rules="emailRules">
          <Input
            placeholder="Please input email"
            autocomplete="off"
            v-model="state.email"
            :icon="['fa', 'envelope']"
            @blur="() => {}"
            @keyup.page-down="() => {}"
            @input.once="onInput"
            @change="$event => handleChange($event, $attrs, $props)"
          />
        </FormControl>

        <FormControl
          :rules="{
            password: [{ required: true, message: 'Please input password' }],
          }"
          label="Password"
        >
          <Input
            placeholder="Please input password"
            v-model="state.password"
            :icon="['fa', 'key']"
            @blur="() => {}"
            @keyup.page-down="() => {}"
            @input.once="onInput"
            @change="handleChange"
          />
        </FormControl>

        <FormControl
          :rules="{
            privileges: [
              { required: true, message: 'Please select privileges' },
            ],
          }"
          label="Privileges"
        >
          <Checkbox
            variant="dark"
            v-model="state.privileges"
            :items="privileges"
            @change="handleChange"
          />
        </FormControl>

        <FormControl
          :offset="3"
          :rules="{
            description: [
              { required: true, message: 'Please input description' },
            ],
          }"
        >
          <Textarea v-model="state.description" />
        </FormControl>

        <FormControl
          :offset="3"
          :rules="{
            role: [{ required: true, message: 'Please select roles' }],
          }"
        >
          <Select
            v-model="state.role"
            placeholder="Please select role"
            :items="['Administrator', 'Guard', 'User']"
            @change="handleChange"
          />
        </FormControl>

        <FormControl
          :offset="3"
          :rules="{
            isPublic: [{ required: true, message: 'Please select public' }],
          }"
        >
          <Select
            keyname="id"
            v-model="state.isPublic"
            placeholder="Please select public"
            :items="[
              { id: true, label: 'Public' },
              { id: false, label: 'Private' },
            ]"
          />
        </FormControl>

        <FormControl
          :offset="3"
          :rules="{
            banner: [{ required: true, message: 'Banner is required' }],
          }"
        >
          <FileUpload v-model="state.banner" />
        </FormControl>

        <Pagination
          v-bind="{ ...pagination }"
          @changePage="onPaginationChange"
        />

        <FormControl :offset="3">
          <Button label="Login" type="submit" variant="dark" class="mt-2" />
        </FormControl>
      </Form>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import { onMounted, reactive, ref, unref } from 'vue';
import Form from './Form';
import Button from '@common/Button';
import Input from '@common/Form/Input';
import Checkbox from '@common/Form/Checkbox';
import Textarea from '@common/Form/Textarea';
import FileUpload from '@common/Form/FileUpload';
import FormControl from './FormControl';
import Select from '@common/Form/Select';
import Pagination from '@common/Pagination';
import debounce from '@util/debounce';

export default {
  components: {
    Form,
    Input,
    FormControl,
    Button,
    Checkbox,
    Textarea,
    Select,
    FileUpload,
    Pagination,
  },
  setup() {
    const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const form = ref();
    const state = reactive({
      password: '',
      email: '',
      privileges: [],
      description: '',
      banner: '',
      role: '',
      isPublic: false,
      banner: '',
    });
    const pagination = reactive({
      current_page: 1,
      total_page: 10,
      per_page: 10,
    });
    const privileges = reactive([
      { value: 'hero', label: 'Thematic Page' },
      { value: 'role', label: 'Role' },
      { value: 'admin', label: 'Admin' },
    ]);

    const roles = reactive(['Administrator', 'Guard', 'User']);

    const emailRules = reactive({
      email: [
        { required: true, message: 'Please input email' },
        {
          type: 'string',
          pattern: emailPattern,
          message: 'Please check the email format',
        },
      ],
    });

    const onSubmit = () => {
      const _form = unref(form);

      _form.validate((error, fields) => {
        console.log(error, fields);
      });
    };

    const handleChange = (event, a) => {
      // console.log(event, a)
      // state.description = state.password
    };

    const onInput = debounce(() => {
      console.log('on input component');
    });

    const onPaginationChange = params => {
      pagination.current_page = params.page;
    };

    const resetForm = () => {
      Object.assign(state, {
        password: '',
        email: '',
        privileges: [],
        description: '',
        banner: '',
        roles: '',
        isPublic: null,
      });
    };

    onMounted(() => {
      setTimeout(() => {
        state.description = 'update desc';
      }, 4000);
    });

    return {
      form,
      state,
      roles,
      pagination,
      privileges,
      emailRules,
      handleChange,
      onSubmit,
      onInput,
      resetForm,
      onPaginationChange,
    };
  },
};
</script>
