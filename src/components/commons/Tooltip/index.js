/* eslint-disable */
import {
  defineComponent,
  nextTick,
  onUnmounted,
  getCurrentInstance,
} from 'vue';
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';

let tooltip = [];

export default defineComponent({
  name: 'CMTooltip',
  props: {
    message: {
      type: String,
      default: '',
    },
    style: {
      type: Object,
    },
    show: {
      type: Boolean,
      default: true,
    },
    options: {
      type: Object,
      default: () => {},
    },
    onFormId: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    let root = getCurrentInstance();
    const {
      data: { prefixClass },
    } = root;
    const { onFormId } = props;
    const dataId = [
      `${prefixClass}-tooltip`,
      Math.floor(new Date().getTime() + Math.random()),
    ].join('-');

    onUnmounted(() => {
      tooltip[dataId]?.unmount();
      delete tooltip[dataId];

      if (onFormId && Reflect.has(ssFormControlTooltips, onFormId))
        delete ssFormControlTooltips[onFormId][dataId];
    });

    return {
      dataId,
    };
  },
  render() {
    const { dataId } = this;
    const { message, show, options, onFormId } = this.$props;
    const children = Reflect.has(this.$slots, 'default')
      ? this.$slots.default()
      : null;
    const defaultOptions = {
      content: message,
      showOnCreate: true,
      trigger: 'click',
      hideOnClick: false,
      zIndex: 9,
    };

    console.warn('SSTooltip ...');
    nextTick(() => {
      const el = document.querySelector(`[data-tooltip-id="${dataId}"]`);

      if (tooltip[dataId]) {
        tooltip[dataId].setContent(message);
      } else
        tippy(el, {
          ...defaultOptions,
          ...options,
          onCreate: context => {
            tooltip[dataId] = context;

            if (Reflect.has(options || {}, 'onCreate'))
              options.onCreate(context);

            if (onFormId) ssFormControlTooltips[onFormId][dataId] = context;
          },
        });
    });

    return (
      <>
        <div data-tooltip-id={dataId}>{children}</div>
      </>
    );
  },
});
