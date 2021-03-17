<template>
  <!-- <teleport to="#ss-modal"> -->
  <div :class="`${prefixClass}-modal--body`" ref="modalEl">
    <div :class="`${prefixClass}-modal--panel`">
      <div :class="`${prefixClass}-modal--panel-content`">
        <h3 class="content-header" v-if="title || $slots.header">
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
  <!-- </teleport> -->
</template>
<script>
/* eslint-disable */
import {
  computed,
  getCurrentInstance,
  h,
  inject,
  nextTick,
  onMounted,
  ref,
} from 'vue';
import Button from '@common/Button';
import ModalDefaultFooter from './ModalFooter';

export default {
  name: 'PLModal',
  components: {
    Button,
  },
  props: {
    name: {
      type: String,
    },
    title: {
      type: String,
      default: '',
    },
    content: {
      type: [String, Object, Function],
      default: '',
    },
    footer: {
      type: [Boolean, Object, Function],
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
    afterClose: {
      type: Function,
      default: () => {},
    },
    closeable: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['onConfirm', 'onCancel'],
  setup(props, { attrs, slots, emit }) {
    const modalEl = ref();
    const modalBodyEl = ref();
    const modalFooterEl = ref();
    const modalConfirmBtnEl = ref();
    const modalCancelBtnEl = ref();
    const modalContext = inject('modalContext');
    const root = getCurrentInstance();

    const handleConfirm = () => {
      toggleModal();
      props.onConfirmFn(hideModal);
    };

    const handleCancel = () => {
      hideModal();
      props.onCancelFn();
    };

    const toggleModal = () => {
      if (props.closeable) hideModal();
    };

    const hideModal = () => {
      setTimeout(() => {
        modalContext.emitter.emit('hide-modal', props);
      }, 100);
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

      if (slots.footer) return slots.footer;

      if (
        typeof footer !== 'boolean' &&
        footer.name === 'PLModalFooterDefault'
      ) {
        return h(footer, { handleConfirm, handleCancel });
      }

      return h(footer, { hideModal });
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
        modalContext.pushModal(root.vnode, modalEl);
      }
    });

    return {
      modalEl,
      modalBodyEl,
      modalFooterEl,
      modalConfirmBtnEl,
      modalCancelBtnEl,
      hideModal,
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
<style lang="scss" src="./styles.scss" scoped></style>
