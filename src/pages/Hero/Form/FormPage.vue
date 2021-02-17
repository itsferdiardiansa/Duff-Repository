<template>
  <Card class="w-full">
    <Form class="w-10/12 p-4" ref="formEl" :model="state" @submit="onSubmit">
      <FormControl
        label="Title"
        :rules="{
          title: [{ required: true, message: 'Please input title' }],
        }"
      >
        <Input placeholder="Title" v-model="state.title" />
      </FormControl>

      <FormControl
        label="URL"
        :rules="{
          button_url: [{ required: true, message: 'Please input button URL' }],
        }"
      >
        <Input placeholder="URL" v-model="state.button_url" />
      </FormControl>

      <FormControl label="Banner (1080x240)">
        <FileUpload type="file" name="banner" @change="handleFileInput" />
      </FormControl>

      <FormControl label="Mobile Banner (360x160)">
        <FileUpload
          type="file"
          name="banner_mobile"
          @change="handleFileInput"
        />
      </FormControl>

      <FormControl label=" ">
        <Button
          type="submit"
          variant="dark"
          label="Create"
          class="w-28 mt-3"
          :icon="['fa', 'save']"
          :bold="true"
          :isLoading="requestStatus.fetch"
        />
      </FormControl>
    </Form>
  </Card>
</template>
<script>
import { computed, reactive, ref, unref } from 'vue';
import { useStore } from 'vuex';
import Card from '@common/Card';
import Button from '@common/Button';
import { Input, FileUpload } from '@common/Form';
import Form from '../../UIKit/components/Form';
import FormControl from '../../UIKit/components/FormControl';
import { toBase64 } from '@util/imageProcessing';

export default {
  components: {
    Card,
    Button,
    Form,
    FormControl,
    // FormItem,
    Input,
    FileUpload,
  },
  setup() {
    const store = useStore();
    const formEl = ref();
    const state = reactive({
      title: '',
      button_url: '',
      banner: '',
      banner_mobile: '',
    });

    const requestStatus = computed(() => {
      return store.getters['hero/getRequestStatus'];
    });

    const onSubmit = () => {
      const form = unref(formEl);

      form.validate(valid => {
        if (valid) {
          store.dispatch('hero/postData', {
            data: unref(state),
            action: 'form.create',
            redirectUrl: '/hero',
            status: 'success',
          });
        }
      });
    };

    const handleFileInput = async e => {
      const name = e.target.name;
      const file = e.target.files[0];

      state[name] = await btoa(toBase64(file));
    };

    return {
      state,
      formEl,
      onSubmit,
      handleFileInput,
      requestStatus,
    };
  },
};
</script>
