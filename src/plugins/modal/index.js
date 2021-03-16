/* eslint-disable */
import {
  createApp,
  defineComponent,
  h,
  inject,
  mergeProps,
  reactive,
  ref,
  Transition,
  unref,
  cloneVNode,
  Teleport,
  getCurrentInstance,
} from 'vue';
import Modal from './components/Modal';
import globalSetting from '@plugin/globalSetting';
import { FontAwesomeIcon } from '@plugin/fontAwesome';
import Emitter from 'mitt';
import uuid from '@util/uuid';
import './components/styles.scss';

const createElement = (instance, app) => {
  const root = document.querySelector('body');
  const div = document.createElement('div');
  const elementId = `${SATPAM_PREFIX_CLASS}-modal`;

  div.setAttribute('id', elementId);
  div.setAttribute('role', 'modal');
  div.setAttribute('class', `${SATPAM_PREFIX_CLASS}-modal`);

  root.appendChild(div);

  return elementId;
};

export const ModalPlugin = app => {
  const emitter = new Emitter();
  const modalEl = document.querySelector('[role="modal"]');

  if (modalEl) return false;

  let instance;
  let componentProps = { closeable: true };
  let childModal = {
    default: Modal,
  };

  const modalContext = {
    windowScrollable: () => {
      const className = `${SATPAM_PREFIX_CLASS}-no-scroll`;

      emitter.on('show-modal', () => {
        document.body.classList.add(className);
      });

      emitter.on('hide-modal', () => {
        document.body.classList.remove(className);
      });
    },
    remove: child => {
      const parent = child.parentNode;

      parent.removeChild(child);
    },
    pushModal: (vnode, elm) => {
      const {
        props: { name },
        el,
      } = vnode;

      if (name) {
        childModal[name] = cloneVNode(vnode);
      }

      modalContext.remove(unref(elm));
    },
    hide: callback => {
      emitter.emit('hide-modal');
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
          hide: modalContext.hide,
          emitter,
        });

        instance.mixin(globalSetting);
        instance.component('FontAwesomeIcon', FontAwesomeIcon);
        instance.provide('modalContext', { emitter });

        const elementId = createElement(instance, app);

        modalContext.windowScrollable();

        if (elementId) instance.mount(`#${elementId}`);
      } catch (error) {
        console.error("We're failed to create modal", error);
      }
    },
    renderModal: defineComponent({
      props: mergeProps(
        {
          onShow: {
            type: Boolean,
            default: false,
          },
        },
        Modal.props
      ),
      beforeCreate() {
        const modalContext = inject('modalContext');
        const root = getCurrentInstance();

        if (
          Reflect.has(modalContext, 'pushModal') &&
          modalContext !== undefined
        ) {
          modalContext.pushModal(root.vnode);
        }
      },
      setup(props) {
        const componentName = ref(false);
        const modalContext = inject('modalContext');

        modalContext.emitter.on('show-modal', params => {
          const [modalName, props] = params;
          componentProps = { closeable: true };

          if (typeof modalName === 'string' && childModal[modalName]) {
            componentName.value = modalName;
            Object.assign(componentProps, childModal[modalName].props, props);
          } else {
            if (typeof params[0] == 'string' && !childModal[modalName]) {
              console.warn(
                'you must provide a property name in the modal dialog'
              );
              return false;
            }

            componentName.value = 'default';
            Object.assign(
              componentProps,
              { content: 'Default content' },
              params[0]
            );
          }
        });

        modalContext.emitter.on('hide-modal', () => {
          componentName.value = false;
        });

        return {
          modalContext,
          componentName,
          componentProps,
        };
      },
      renderOverlay() {
        return h('div', {
          class: 'ss-modal--overlay',
        });
      },
      render() {
        const { componentName, modalContext } = this;
        let component;

        if (componentName) {
          component = childModal[componentName];
        }

        return Transition(
          {
            name: 'ss-modal',
            appear: true,
            duration: 400,
          },
          {
            slots: () =>
              !component
                ? null
                : h(
                    'div',
                    {
                      class: 'ss-modal--container',
                    },
                    [
                      h('div', {
                        class: 'ss-modal--overlay',
                        onClick: () =>
                          componentProps.closeable &&
                          modalContext.emitter.emit('hide-modal'),
                      }),
                      h(component, {
                        ...componentProps,
                        onShow: true,
                      }),
                    ]
                  ),
          }
        );
      },
    }),
  };

  modalContext.init();

  window.sModal = modalContext;
};

export default {
  install: ModalPlugin,
};
