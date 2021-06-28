<template>
  <pre>
    {{ JSON.stringify(state.form, null, 2) }}
  </pre>
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
      :rules="{
        role_hash_id: [{ required: true, message: 'Role is required' }],
      }"
    >
      <div class="flex items-center">
        <Button
          :label="state.form.role ? 'Change role' : 'Choose role'"
          variant="dark"
          tabindex="-1"
          type="button"
          :icon="['fa', 'user-tag']"
          @click="handleSelectRole"
        />
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

  <Modal name="role-list">
    <div class="list">
      <template v-if="roleRequestStatus.fetch">
        <template v-for="item in range(8)" :key="item">
          <RectSkeleton width="100%" height="15px" />
        </template>
      </template>
      <template v-else-if="roleRequestStatus.error.status">
        <div class="error">
          <div class="wrapper">
            <div class="img">
              <img
                class="img-error"
                svg-inline
                src="@icon/error-chunk-load.svg"
              />
            </div>

            <div class="description">
              <span> Oops... something went wrong! </span>

              <Button
                variant="dark"
                :pill="true"
                :icon="['fa', 'redo-alt']"
                @click="fetchRole"
              />
            </div>
          </div>
        </div>
      </template>
      <template v-else>
        <template v-for="item in roles" :key="item.hash_id">
          <div class="item">
            <input
              type="radio"
              :id="item.hash_id"
              :value="item.hash_id"
              v-model="state.form.role_hash_id"
            />
            <label :for="item.hash_id" class="ml-2 cursor-pointer">{{
              item.name
            }}</label>
          </div>
        </template>
      </template>
    </div>

    <Pagination
      v-bind="rolePagination"
      @changePage="handlePageChange"
      v-if="!roleRequestStatus.fetch && !roleRequestStatus.error.status"
    />
  </Modal>
</template>
<script>
/* eslint-disable */
import { computed, nextTick, onMounted, reactive, ref, unref } from 'vue';
import { useStore } from 'vuex';
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
import Pagination from '@common/Pagination';
import http from '@service/http';

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
    Pagination,
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
    const pagination = reactive({ page: 1, limit: 10 });
    const state = reactive({
      form: {
        name: '',
        email: '',
        role_hash_id: null,
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

    const roles = computed(() => {
      return store.getters['role/getItems'];
    });

    const rolePagination = computed(() => {
      return store.getters['role/getPagination'];
    });

    const roleRequestStatus = computed(() => {
      return store.getters['role/getRequestStatus'];
    });

    const fetchRole = () => {
      store.dispatch('role/fetchData', pagination);
    };

    const handleSelectRole = () => {
      fetchRole();

      SSModal.show('role-list', {
        title: 'Role List',
        footer: false,
        afterClose: () => {
          http.requestCancel.cancel('fetch role has been rejected');
        },
      });
    };

    const handlePageChange = params => {
      Object.assign(pagination, params);

      fetchRole();
    };

    nextTick(() => {
      const { data, isCreate } = props;

      if (data && !isCreate) {
        state.form = data;
        state.form.role_hash_id = data.role?.hash_id;
      }
    });

    return {
      formEl,
      state,
      roles,
      rolePagination,
      roleRequestStatus,
      fetchRole,
      handlePageChange,
      handleSubmit,
      emailPattern,
      handleSelectRole,
    };
  },
};
</script>
<style lang="scss" scoped>
.list {
  @apply grid grid-cols-2 gap-3;

  .item {
    @apply flex items-center;
  }

  .error {
    @apply col-span-2;

    .wrapper {
      @apply flex flex-col items-center;

      .img {
        svg {
          @apply w-60 h-60;
        }
      }

      .description {
        @apply flex items-center;

        span {
          @apply mr-2;
        }
      }
    }
  }
}
</style>
