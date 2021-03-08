/* eslint-disable */
import {
  createApp,
  defineComponent,
  h,
  inject,
  mergeProps,
  reactive,
  ref,
  unref,
} from 'vue';
import Modal from './components/Modal';
import globalSetting from '@plugin/globalSetting';
import { FontAwesomeIcon } from '@plugin/fontAwesome';
import Emitter from 'mitt';
import uuid from '@util/uuid';

const createElement = (instance, app) => {
  const root = document.querySelector('body');
  const div = document.createElement('div');
  const elementId = uuid(`${SATPAM_PREFIX_CLASS}-modal`);

  div.setAttribute('id', elementId);
  div.setAttribute('role', 'modal');
  div.setAttribute('class', `${SATPAM_PREFIX_CLASS}-modal`);

  root.appendChild(div);

  return elementId;
};

export const ModalPlugin = app => {
  const emitter = new Emitter();
  const modalEl = document.querySelector('[role="modal"]');
  let instance;

  if (modalEl) return false;

  let componentProps = {};
  let childModal = {
    default: Modal,
  };

  const modalContext = {
    pushModal: vnode => {
      const { name } = vnode.props;

      childModal[name] = vnode;
    },
    show: (...args) => {
      const {
        modalContext: { emitter },
      } = instance._context.provides;

      emitter.emit('show-modal', args);
    },
    init: async () => {
      try {
        instance = createApp(modalContext.renderModal);

        app.component('Modal', Modal);
        app.provide('modalContext', {
          pushModal: modalContext.pushModal,
          emitter,
        });

        instance.mixin(globalSetting);
        instance.component('FontAwesomeIcon', FontAwesomeIcon);
        instance.provide('modalContext', {
          emitter,
        });

        const elementId = createElement(instance, app);

        if (elementId) instance.mount(`#${elementId}`);
      } catch (error) {
        console.error("We're failed to create modal", error);
      }
    },
    renderModal: defineComponent({
      setup() {
        const componentName = ref(false);
        const modalContext = inject('modalContext');

        modalContext.emitter.on('show-modal', params => {
          const [modalName, options] = params;
          componentProps = reactive({});

          if (typeof modalName === 'string') {
            componentName.value = modalName;
            Object.assign(componentProps, childModal[modalName].props);
          } else {
            componentName.value = 'default';
            componentProps = params[0];
          }
        });

        modalContext.emitter.on('hide-modal', () => {
          componentName.value = false;
        });

        return {
          componentName,
          componentProps,
        };
      },
      render() {
        const { componentName } = this;
        let component;

        if (componentName) {
          component = childModal[componentName];
        }

        return !componentName
          ? null
          : h(component, {
              ...componentProps,
              onShow: true,
            });
      },
    }),
  };

  modalContext.init();

  window.sModal = modalContext;
};

export default {
  install: ModalPlugin,
};
