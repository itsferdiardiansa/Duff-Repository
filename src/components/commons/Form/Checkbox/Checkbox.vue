<template>
  <div :class="getClass">
    <template v-for="(item, key) in items" :key="key">
      <label class="ck-item">
        <input
          type="checkbox"
          v-model="checkboxState"
          :value="getValue(item, key)"
          @change="handleChange"
        />

        <span class="ck-label" v-if="item.label">{{ item.label }}</span>
      </label>
    </template>
  </div>
</template>
<script>
/* eslint-disable */
import { computed, getCurrentInstance, unref } from 'vue';
export default {
  name: 'CMCheckbox',
  props: {
    modelValue: {
      type: [String, Number, Array],
    },
    items: {
      type: Array,
    },
    keyname: {
      type: String,
    },
    variant: {
      type: String,
      default: 'primary',
      validator: function (variant) {
        return ~[
          'primary',
          'danger',
          'warning',
          'dark',
          'success',
          'light',
          'orange',
        ].indexOf(variant);
      },
    },
    type: String,
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const checkboxState = computed(() => {
      let modelValue = [].concat(props.modelValue);

      return modelValue;
    });

    const getClass = computed(() => {
      const {
        data: { prefixClass },
      } = getCurrentInstance();
      const { variant, type } = props;
      let customClass = [`${prefixClass}-control--checkbox`];

      if (type === 'button') {
        customClass.push('ck-button');
        customClass.push(`ck-${variant}`);
      }

      return customClass;
    });

    const getValue = (item, key) => {
      const { keyname } = props;

      return keyname === undefined ? key : item[keyname];
    };

    const handleChange = event => {
      const { checked, value } = event.target;
      const itemIndex = unref(checkboxState).findIndex(item => item == value);
      let val = [].concat(unref(checkboxState));

      if (checked) val.push(event.target.value);
      else val.splice(itemIndex, 1);

      emit('update:modelValue', val);
    };

    return {
      getValue,
      getClass,
      checkboxState,
      handleChange,
    };
  },
};
</script>
<style lang="scss" scoped>
$variants: (
  'primary',
  'danger',
  'warning',
  'dark',
  'success',
  'light',
  'orange'
);

.ck {
  @each $variant in $variants {
    &-#{$variant} {
      .ck-item {
        input {
          &:checked + span {
            @apply bg-#{$variant} text-gray-100;
          }
        }
      }

      .ck-label {
        @apply border border-#{$variant} text-#{$variant};
      }
    }
  }

  &-button {
    .ck-item {
      input {
        @apply appearance-none;
      }
    }

    .ck-label {
      @apply border rounded-full py-0.5 px-3 m-0;
    }
  }

  &-item {
    @apply inline-flex items-center mr-2 cursor-pointer my-1;
  }

  &-label {
    @apply ml-2;
  }
}
</style>
