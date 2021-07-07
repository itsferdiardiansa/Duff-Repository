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
      ref="inputRef"
      :class="`${prefixClass}-input`"
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      :autofocus="autofocus"
      v-bind="$attrs"
      @keyup="handleChange"
      @change="$emit('change', $event)"
      @input="$emit('update:modelValue', $event.target.value)"
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
import { computed, getCurrentInstance, onMounted, ref } from 'vue';
import debounce from '@util/debounce';

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
    autofocus: {
      type: [Boolean, String],
      default: false,
    },
    type: {
      type: String,
      default: 'text', // text, email, password
      validator: function (variant) {
        return ~['text', 'email', 'password', 'search'].indexOf(variant);
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
    const inputRef = ref();

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

    const setAutofocus = debounce(() => {
      const { autofocus } = props;

      if (autofocus == 'true') inputRef.value.focus();
    }, 10);

    onMounted(() => {
      setAutofocus();
    });

    return {
      handleChange,
      getElUid,
      inputRef,
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
    @apply w-full border rounded py-1 px-4 focus:outline-none;

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
