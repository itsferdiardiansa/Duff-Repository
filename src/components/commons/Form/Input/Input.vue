<template>
  <div :class="`${prefixClass}-form-control`">
    <label 
      :class="`${prefixClass}-form-control--label`"
      v-if="label"
    >
      {{ label }}
    </label>

    <div class="w-full relative" :class="{'has-icon': icon.length, 'has-error': onError}">
      <template v-if="icon.length">
        <font-awesome-icon :icon="icon" :class="`${prefixClass}-form-control--icon`" />
      </template>

      <input 
        :class="`${prefixClass}-form-control--input`" 
        :type="type"
        :placeholder="placeholder"
        :value="modelValue"
        :id="getElUid"
        v-bind="$attrs"
        @keyup="handleChange" 
        @change="$emit('change', $event)"
        @input="$emit('update:modelValue', (type === 'checkbox') ? $event.target.checked : $event.target.value)"
      />

      <label v-if="type === 'checkbox'" :for="getElUid">{{ labelCheckbox }}</label>

      <template v-if="onError && errorMessage">
        <span class="text-red-400 text-sm italic">{{ errorMessage }}</span>
      </template>
    </div>
  </div>
</template>
<script>
import debounce from '@util/debounce'
import { computed, getCurrentInstance } from 'vue'

export default {
  emits: [
    'update:modelValue'
  ],
  props: {
    modelValue: {
      type: [String, Boolean, Number],
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    labelCheckbox: {
      type: String,
      default: ''
    },
    icon: {
      type: Array,
      default: () => []
    },
    onError: {
      type: Boolean,
      default: false
    },
    errorMessage: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text', // text, email, password
      validator: function(variant) {
        return ~['text', 'email', 'password', 'file', 'checkbox'].indexOf(variant)
      }
    },
    placeholder: {
      type: String,
      default: '',
    },
    onChange: {
      type: Function,
      default: () => { }
    }
  },
  setup(props) {
    const handleChange = debounce(e => {
      const { onChange } = props

      onChange(e.target.value, e)
    }, 100)

    const getElUid = computed(() => {
      const { uid, type: { __hmrId } } = getCurrentInstance()

      return `input-${uid}-${__hmrId}`
    })
    return {
      handleChange,
      getElUid
    }
  }
}
</script>
<style lang="scss" scoped>
.input-text {
  @apply w-full rounded py-1 px-2 text-sm border-0;

  &.large {
    @apply h-10 text-lg;
  }

  &:focus {
    @apply outline-none;
  }
}

.#{$prefixClass}-form-control {
  @apply flex items-center mb-6;

  .has-icon {
    .#{$prefixClass}-form-control--input {
      @apply pl-10;
    }
  }

  .has-error {
    .#{$prefixClass}-form-control--input {
      @apply border-red-400 mb-2;
    }
  }

  &--label {
    @apply w-1/4 block uppercase tracking-wide text-xs font-bold mb-2;
  }

  &--icon {
    @apply h-4 absolute top-4 my-auto pl-4 text-gray-400 fill-current;
  }

  &--input {
    @apply w-full border rounded py-3 px-4;

    &[type="file"] {
      @apply w-auto inline border-0 focus:outline-none px-0;
    }

    &[type="checkbox"] {
      @apply w-auto inline mr-2;
    }
  }
}
</style>
