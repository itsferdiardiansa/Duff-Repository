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
import VueLazyLoad from '@jambonn/vue-lazyload';
import errorImage from '@asset/image-default.jpg';
import './components/styles.scss';

const createElement = (instance, app) => {
  const root = document.querySelector('body');
  const div = document.createElement('div');
  const elementClass = `ss-modal-root`;

  div.setAttribute('role', 'modal');
  div.setAttribute('class', elementClass);

  root.appendChild(div);

  return elementClass;
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
      const className = `ss-no-scroll`;

      emitter.on('show-modal', () => {
        document.documentElement.classList.add(className);
      });

      emitter.on('hide-modal', () => {
        document.documentElement.classList.remove(className);
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
    show: (...args) => {
      const {
        modalContext: { emitter },
      } = instance._context.provides;

      emitter.emit('show-modal', args);
    },
    init: () => {
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

        // Image lazy load
        instance.use(VueLazyLoad, {
          preLoad: 1.3,
          error: errorImage,
          listenEvents: ['scroll'],
          throttleWait: 800,
        });

        const elementClass = createElement(instance, app);

        modalContext.windowScrollable();

        if (elementClass) instance.mount(`.${elementClass}`);
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

        modalContext.emitter.on('hide-modal', props => {
          componentName.value = false;

          if (Reflect.has(props, 'afterClose')) props.afterClose();
        });

        return {
          modalContext,
          componentName,
          componentProps,
        };
      },
      renderOverlay() {
        return h('div', {
          class: `ss-modal--overlay`,
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
            name: `ss-modal`,
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
                      class: `ss-modal--container`,
                    },
                    [
                      h('div', {
                        class: `ss-modal--overlay`,
                        onClick: () =>
                          componentProps.closeable &&
                          modalContext.emitter.emit(
                            'hide-modal',
                            componentProps
                          ),
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

  window.SSModal = modalContext;
};

export default {
  install: ModalPlugin,
};
