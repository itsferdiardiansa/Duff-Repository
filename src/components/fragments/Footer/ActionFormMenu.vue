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
      label="Link"
      :rules="{
        link: [
          { required: true, message: 'Link is required' },
          { pattern: urlPattern, message: 'Please check the URL format' },
        ],
      }"
    >
      <Input placeholder="Link" v-model="state.form.link" autofocus />
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
        :items="positionList"
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
import { computed, onMounted, reactive, ref, unref } from 'vue';
import Form, { FormControl, Input, Select } from '@common/Form';
import Button from '@common/Button';
import { useStore } from 'vuex';
import { urlPattern } from '@util/pattern';

export default {
  name: 'FooterActionFormMenu',
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
    const store = useStore();
    const formEl = ref();
    const state = reactive({
      form: {
        name: '',
        position: '',
        link: '',
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

    const positionList = computed(() => {
      return store.getters['footer/getPosition'];
    });

    onMounted(() => {
      const { data, isCreate } = props;

      if (data && !isCreate) state.form = data;
    });

    return {
      formEl,
      state,
      positionList,
      handleSubmit,
      urlPattern,
    };
  },
};
</script>
