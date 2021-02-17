<template>
  <div
    :class="[
      `${prefixClass}-control--input`,
      { 'has-icon': icon.length, 'has-error': onError },
    ]"
  >
    <template v-if="icon.length">
      <span class="icon">
        <font-awesome-icon
          :icon="icon"
          :class="`${prefixClass}-form-control--icon`"
        />
      </span>
    </template>

    <input
      :class="`${prefixClass}-input`"
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      :id="getElUid"
      v-bind="$attrs"
      autocomplete="off"
      @keyup="handleChange"
      @change="$emit('change', $event)"
      @input="
        $emit(
          'update:modelValue',
          type === 'checkbox' ? $event.target.checked : $event.target.value
        )
      "
    />

    <label v-if="type === 'checkbox'" :for="getElUid">{{
      labelCheckbox
    }}</label>

    <template v-if="onError && errorMessage">
      <span class="text-red-400 text-sm italic">{{ errorMessage }}</span>
    </template>
  </div>
</template>
<script>
import debounce from '@util/debounce';
import { computed, getCurrentInstance, ref } from 'vue';

export default {
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: [String, Boolean, Number],
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    labelCheckbox: {
      type: String,
      default: '',
    },
    icon: {
      type: Array,
      default: () => [],
    },
    onError: {
      type: Boolean,
      default: false,
    },
    errorMessage: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'text', // text, email, password
      validator: function (variant) {
        return ~['text', 'email', 'password'].indexOf(variant);
      },
    },
    placeholder: {
      type: String,
      default: '',
    },
    onChange: {
      type: Function,
      default: () => {},
    },
  },
  setup(props) {
    const inputEl = ref();

    const handleChange = debounce(e => {
      const { onChange } = props;

      onChange(e.target.value, e);
    }, 100);

    const getElUid = computed(() => {
      const {
        uid,
        type: { __hmrId },
      } = getCurrentInstance();

      return `input-${uid}-${__hmrId}`;
    });
    return {
      handleChange,
      getElUid,
      inputEl,
    };
  },
};
</script>
<style lang="scss">
.#{$prefixClass}-control--input {
  @apply relative;

  &.has-error {
    input {
      @apply border-red-400;
    }
  }

  &.has-icon {
    input {
      @apply pl-10;
    }
  }

  input {
    @apply w-full border rounded py-1 px-4;

    &[type='file'] {
      @apply w-auto inline border-0 focus:outline-none px-0;
    }

    &[type='checkbox'] {
      @apply w-auto inline mr-2;
    }
  }

  .icon {
    @apply absolute top-2.5 my-auto pl-4;

    svg {
      @apply h-4 text-gray-400 fill-current;
    }
  }
}
</style>
