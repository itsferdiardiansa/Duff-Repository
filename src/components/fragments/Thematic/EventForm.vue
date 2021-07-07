<template>
  <Form ref="formEl" :model="state.form" @submit="handleSubmit">
    <FormControl
      label="Event Name"
      :rules="{
        event_id: [{ required: true, message: 'Event name is required' }],
      }"
    >
      <div class="flex items-center">
        <div>
          <Button
            type="button"
            variant="dark"
            label="Search Event"
            :icon="['fa', 'search']"
            @click="handleSearchEvent(state.form.event_id)"
          />
        </div>

        <div class="ml-2">
          {{
            !state.form.event_id
              ? 'Event name not selected'
              : 'Event name has been selected'
          }}
        </div>
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
import { onMounted, reactive, ref, unref } from 'vue';
import Form, {
  FormControl,
  FileUpload,
  Input,
  Textarea,
  Select,
} from '@common/Form';
import ColorPicker from '@common/ColorPicker';
import Button from '@common/Button';
import Section from '@common/Layout/Section';
import SearchEventPanel from './SearchEventPanel';
import http from '@service/http';

export default {
  name: 'ThematicActionForm',
  components: {
    Button,
    Form,
    FormControl,
    FileUpload,
    Input,
    Textarea,
    ColorPicker,
    Select,
    Section,
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
        event_id: null,
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

    const handleSelectEvent = event => {
      state.form.event_id = event?.id_event;
    };

    const handleSearchEvent = idEvent => {
      SSModal.show({
        footer: false,
        content: (
          <SearchEventPanel idEvent={idEvent} onSelected={handleSelectEvent} />
        ),
        afterClose: () => {
          http.requestCancel?.cancel('the search event has been rejected');
        },
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
      handleSearchEvent,
    };
  },
};
</script>
