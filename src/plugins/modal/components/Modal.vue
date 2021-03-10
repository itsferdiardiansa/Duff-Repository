<template>
  <template v-if="isShow">
    <div :class="`${prefixClass}-modal`" ref="modalEl">
      <div :class="`${prefixClass}-modal--container`">
        <div
          :class="`${prefixClass}-modal--overlay`"
          aria-hidden="true"
          @click="toggleModal(false)"
        >
          <div :class="`${prefixClass}-modal--overlay-bg`"></div>
        </div>

        <span class="hidden sm:inline-block sm:align-middle sm:h-screen"
          >&#8203;</span
        >

        <div :class="`${prefixClass}-modal--body`" ref="modalBodyEl">
          <div :class="`${prefixClass}-modal--panel`">
            <div :class="`${prefixClass}-modal--panel-content`">
              <h3 class="content-header" v-if="title">
                <slot name="header">
                  {{ title }}
                </slot>
              </h3>

              <div class="content-desc">
                <component :is="getContent" />
              </div>
            </div>
          </div>

          <div ref="modalFooterEl" :class="getFooterClass" v-if="footer">
            <component :is="getFooter" />
          </div>
        </div>
      </div>
    </div>
  </template>
</template>
<script>
/* eslint-disable */
import { computed, getCurrentInstance, h, inject, onMounted, ref } from 'vue';
import Button from '@common/Button';
import ModalDefaultFooter from './ModalFooter';

export default {
  name: 'PLModal',
  components: {
    Button,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    content: {
      type: [String, Object],
      default: '',
    },
    footer: {
      type: [Boolean, Object],
      default: ModalDefaultFooter,
    },
    footerAlign: {
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
    onShow: {
      type: Boolean,
      default: false,
    },
  },
  created() {},
  setup(props, { attrs, slots }) {
    const modalEl = ref();
    const modalBodyEl = ref();
    const modalFooterEl = ref();
    const modalConfirmBtnEl = ref();
    const modalCancelBtnEl = ref();
    const isShow = ref(false);
    const modalContext = inject('modalContext');
    const root = getCurrentInstance();
    let currentData;

    const handleConfirm = () => {
      toggleModal(false);
      props.onConfirmFn(currentData);
    };

    const handleCancel = () => {
      toggleModal(false);
      props.onCancelFn();
    };

    const toggleModal = status => {
      isShow.value = status;

      setTimeout(() => {
        modalContext.emitter.emit('hide-modal');
      }, 100);
    };

    const modal = {
      show: data => {
        isShow.value = true;
        currentData = data;
      },
    };

    const getContent = computed(() => {
      const { content } = props;
      let childContent = {};

      if (typeof content === 'string' && content) {
        childContent = h('label', {}, content);

        return childContent;
      }

      return content ? content : slots.default;
    });

    const getFooter = computed(() => {
      const { footer } = props;

      if (
        typeof footer !== 'boolean' &&
        footer.name === 'PLModalFooterDefault'
      ) {
        return h(footer, { handleConfirm, handleCancel });
      }

      return footer;
    });

    const getFooterClass = computed(() => {
      const {
        data: { prefixClass },
      } = getCurrentInstance();
      const { footerAlign } = props;
      let footerClass = [`${prefixClass}-modal--footer`];

      if (footerAlign) footerClass.push(`align-${footerAlign}`);

      return footerClass;
    });

    onMounted(() => {
      if (
        Reflect.has(modalContext, 'pushModal') &&
        modalContext !== undefined
      ) {
        modalContext.pushModal(root.vnode);
      }

      isShow.value = props.onShow;
    });
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
      toggleModal,
      getContent,
      getFooter,
      getFooterClass,
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
    @apply bg-gray-50 pb-5 px-5 flex flex-row-reverse;

    &.align-left {
      @apply justify-end;
    }

    &.align-center {
      @apply justify-center;
    }
  }

  &--panel {
    @apply bg-white p-5;

    &-content {
      @apply mt-3 text-center sm:mt-0 sm:text-left;

      .content-header {
        @apply mb-4 text-lg leading-6 font-medium text-gray-900;
      }

      .content-desc {
      }
    }
  }
}
</style>
