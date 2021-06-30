<template>
  <pre>
    {{ state.form }}
  </pre>
  <Form ref="formEl" :model="state.form" @submit="handleSubmit">
    <FormControl
      label="Bank Name"
      :rules="{
        bank_name: [{ required: true, message: 'Bank Name is required' }],
      }"
    >
      <Input
        placeholder="Bank Name"
        name="Bank Name"
        v-model="state.form.bank_name"
        autofocus
      />
    </FormControl>

    <FormControl
      label="Bank NEO"
      :rules="{
        id_bank_core: [{ required: true, message: 'Bank Neo is required' }],
      }"
    >
      <div class="grid grid-cols-2 gap-2 items-center">
        <div class="">
          <Select
            keyname="id_bank"
            labelKeyname="name"
            :items="bankCoreItems"
            :disabled="
              bankCoreRequestStatus.fetch || bankCoreRequestStatus.error
            "
            v-model="state.form.id_bank_core"
          />
        </div>

        <div class="flex items-center">
          <template v-if="bankCoreRequestStatus.fetch">
            <Spinner class="bank-spinner" :width="15" :height="15" />
          </template>
          <template v-else-if="bankCoreRequestStatus.error">
            <Button
              variant="orange"
              :icon="['fa', 'redo-alt']"
              @click="fetchBankCore"
              :pill="true"
            />
            <span class="ml-2">We failed to load Bank NEO</span>
          </template>
        </div>
      </div>
    </FormControl>

    <FormControl
      label="Bank LPS"
      :rules="{
        id_bank_lps: [{ required: true, message: 'Bank LPS is required' }],
      }"
    >
      <div class="grid grid-cols-2 gap-2 items-center">
        <div>
          <Select
            keyname="id"
            labelKeyname="bank_name"
            :items="copyLpsItems"
            :disabled="copyLpsRequestStatus.fetch || copyLpsRequestStatus.error"
            v-model="state.form.id_bank_lps"
          />
        </div>

        <div class="flex items-center">
          <template v-if="copyLpsRequestStatus.fetch">
            <Spinner class="bank-spinner" :width="15" :height="15" />
          </template>
          <template v-else-if="copyLpsRequestStatus.error">
            <Button
              variant="orange"
              :icon="['fa', 'redo-alt']"
              @click="fetchCopyLps"
              :pill="true"
            />
            <span class="ml-2">We failed to load Bank LPS</span>
          </template>
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
import { computed, onMounted, reactive, ref, unref } from 'vue';
import { useStore } from 'vuex';
import Form, { FormControl, Input, Select } from '@common/Form';
import Button from '@common/Button';
import Spinner from '@common/Loader/Spinner';
import { urlPattern } from '@util/pattern';

export default {
  name: 'PivotBankActionForm',
  components: {
    Button,
    Form,
    FormControl,
    Input,
    Select,
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
    const store = useStore();
    const formEl = ref();
    const state = reactive({
      form: {
        bank_name: '',
        id_bank_core: '', // string number
        id_bank_lps: null,
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

    const fetchBankCore = () => {
      store.dispatch('pivotBank/fetchBankCore');
    };

    const fetchCopyLps = () => {
      store.dispatch('pivotBank/fetchCopyLps');
    };

    const bankCoreItems = computed(() => {
      return store.getters['pivotBank/getBankCoreItems'];
    });

    const bankCoreRequestStatus = computed(() => {
      return store.getters['pivotBank/getBankCoreRequestStatus'];
    });

    const copyLpsItems = computed(() => {
      return store.getters['pivotBank/getCopyLpsItems'];
    });

    const copyLpsRequestStatus = computed(() => {
      return store.getters['pivotBank/getCopyLpsRequestStatus'];
    });

    onMounted(() => {
      const { data, isCreate } = props;

      fetchBankCore();
      fetchCopyLps();

      if (data && !isCreate) state.form = data;
    });

    return {
      formEl,
      state,
      handleSubmit,
      urlPattern,
      bankCoreItems,
      copyLpsItems,
      bankCoreRequestStatus,
      copyLpsRequestStatus,
      fetchBankCore,
      fetchCopyLps,
    };
  },
};
</script>
<style lang="scss">
.bank-spinner {
  div:nth-child(2) {
    border-color: #2490d8 !important;
  }
}
</style>
