<template>
  <div v-bind="$attrs" :class="customClass">
    <div :class="`${prefixClass}-badge--wrapper`" v-if="!dot">
      <template v-if="icon.length">
        <div :class="`${prefixClass}-badge--icon`">
          <font-awesome-icon :icon="icon" ref="iconEl" />
        </div>
      </template>

      <template v-if="hasSlot || label.length">
        <div
          :class="[`${prefixClass}-badge--label`, { 'has-icon': icon.length }]"
        >
          <slot>
            {{ label }}
          </slot>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
import { computed, getCurrentInstance, ref } from 'vue';
import defaultProps from './props';

export default {
  name: 'CMBadge',
  props: defaultProps,
  setup(props, { slots }) {
    let root = getCurrentInstance();
    let iconEl = ref();

    const getVariantClass = prefixBtnClass => {
      const { inverse, variant } = props;
      let btnClass = `${prefixBtnClass}--${variant}`;

      if (inverse) btnClass += '-inverse';

      return btnClass;
    };

    const customClass = computed(() => {
      const {
        data: { prefixClass },
      } = root;
      const { size, rounded, bold, pill, dot } = props;
      const btnClass = prefixClass.concat('-badge');
      let customClass = [btnClass];

      customClass.push(getVariantClass(btnClass));

      if (size) customClass.push(btnClass.concat('--' + size));

      if (bold) customClass.push('text-bold');

      if (pill) customClass.push('pill');
      else if (!rounded) customClass.push('no-rounded');

      if (dot) customClass.push('dot');

      return [customClass.join(' ')];
    });

    const hasSlot = computed(() => !!slots.default);

    return {
      customClass,
      hasSlot,
      iconEl,
    };
  },
};
</script>
<style lang="scss">
@import './variant.scss';
@import './size.scss';

.#{$prefixClass}-badge {
  @apply h-9 focus:outline-none rounded px-3 transition duration-300 relative inline-block;
  @apply text-gray-800 overflow-hidden whitespace-nowrap;

  @include variant;

  @include size;

  &.no-rounded {
    @apply rounded-none;
  }

  &.pill {
    @apply rounded-full;
  }

  &.text-bold {
    @apply font-bold;
  }

  &.disabled {
    @apply disabled:opacity-70 pointer-events-none;
  }

  &--wrapper {
    @apply h-full flex-grow-0 flex flex-wrap items-center justify-center;
  }

  &--label {
    @apply pt-0.5;

    &.has-icon {
      @apply ml-2;
    }
  }
}
</style>
