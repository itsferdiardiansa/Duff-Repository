<template>
  <transition name="slide-top" appear>
    <div :class="`${prefixClass}-modal`" v-if="isShow" ref="modalEl">
      <div :class="`${prefixClass}-modal--container`">
        <div
          :class="`${prefixClass}-modal--overlay`"
          aria-hidden="true"
          @click="onBlur"
        >
          <div :class="`${prefixClass}-modal--overlay-bg`"></div>
        </div>

        <span class="hidden sm:inline-block sm:align-middle sm:h-screen"
          >&#8203;</span
        >

        <div
          :class="`${prefixClass}-modal--body`"
          role="dialog"
          ref="modalBodyEl"
        >
          <div :class="`${prefixClass}-modal--panel`">
            <div :class="`${prefixClass}-modal--panel-content`">
              <h3 class="content-header">
                <slot name="header">
                  {{ title }}
                </slot>
              </h3>

              <div class="content-desc">
                <slot name="body">
                  {{ description }}
                </slot>
              </div>
            </div>
          </div>

          <div
            :class="`${prefixClass}-modal--footer`"
            v-if="withConfirmation"
            ref="modalFooterEl"
          >
            <Button
              ref="modalConfirmBtnEl"
              label="Yes"
              variant="success"
              :bold="true"
              :icon="['fa', 'check-circle']"
              @click="handleConfirm"
            />

            <Button
              ref="modalCancelBtnEL"
              label="No"
              variant="danger"
              :bold="true"
              :icon="['fa', 'times-circle']"
              @click="handleCancel"
            />
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import { ref } from 'vue';
import Button from '@common/Button';

export default {
  name: 'CMModal',
  components: {
    Button,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    withConfirmation: {
      type: Boolean,
      default: true,
    },
    onConfirmFn: {
      type: Function,
      default: () => {},
    },
    onCancelFn: {
      type: Function,
      default: () => {},
    },
  },
  created() {
    self.$modal = this.modal;
  },
  setup(props) {
    const modalEl = ref();
    const modalBodyEl = ref();
    const modalFooterEl = ref();
    const modalConfirmBtnEl = ref();
    const modalCancelBtnEl = ref();
    const isShow = ref(false);
    let currentData;

    const handleConfirm = () => {
      isShow.value = false;

      props.onConfirmFn(currentData);
    };

    const handleCancel = () => {
      isShow.value = false;

      props.onCancelFn();
    };

    const modal = {
      show: data => {
        isShow.value = true;
        currentData = data;
      },
    };

    return {
      modal,
      modalEl,
      modalBodyEl,
      modalFooterEl,
      modalConfirmBtnEl,
      modalCancelBtnEl,
      isShow,
      handleConfirm,
      handleCancel,
    };
  },
};
</script>
<style lang="scss" scoped>
.#{$prefixClass}-modal {
  @apply fixed z-50 inset-0 overflow-y-auto;

  &--container {
    @apply flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0;
  }

  &--overlay {
    @apply fixed inset-0 transition-opacity;

    &-bg {
      @apply absolute inset-0 bg-gray-500 opacity-75;
    }
  }

  &--body {
    @apply inline-block align-bottom bg-white rounded-lg text-left z-50;
    @apply overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full;
  }

  &--footer {
    @apply bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse grid grid-flow-col gap-2;
  }

  &--panel {
    @apply bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4;

    &-content {
      @apply mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left;

      .content-header {
        @apply text-lg leading-6 font-medium text-gray-900;
      }

      .content-desc {
        @apply mt-4;
      }
    }
  }
}
</style>
