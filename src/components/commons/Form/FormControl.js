/* eslint-disable */
import {
  defineComponent,
  getCurrentInstance,
  inject,
  onMounted,
  h,
  unref,
  reactive,
  Transition,
} from 'vue';
import Schema from 'async-validator';
import { cloneElement } from '@util/vnode';
import debounce from '@util/debounce';
import './styles.scss';

const getListeners = child => {
  let listeners = {};
  let prefixListener = /^on/;
  let childProps = child?.props;

  if (childProps) {
    Object.keys(childProps).forEach(item => {
      if (prefixListener.test(item)) {
        listeners = {
          ...listeners,
          [item]: childProps[item],
        };
      }
    });
  }

  return listeners;
};

const isVNode = element => {
  return (
    Reflect.has(element, 'appContext') &&
    Reflect.has(element, 'props') &&
    Reflect.has(element, 'component')
  );
};

export default defineComponent({
  name: 'CMFormControl',
  props: {
    rules: {
      type: Object,
      default: () => [],
    },
    label: {
      type: String,
      default: '',
    },
    colspan: {
      type: Number,
    },
  },
  created() {},
  setup(props, context) {
    const instance = getCurrentInstance();
    const formContext = inject('formContext');
    const controlStatus = reactive({
      hasFeedback: false,
      errorMessage: null,
    });

    const onFieldChange = () => {
      validate();
    };

    const getRules = () => {
      return unref(props.rules);
    };

    const getFilteredRules = () => {
      const rules = getRules();
      const field = Object.keys(rules)[0];
      const modelValue = formContext.getModel()[field];

      if (modelValue === undefined) return false;

      return {
        rules,
        field,
        value: {
          [field]: modelValue,
        },
      };
    };

    const validate = (...args) => {
      const callback =
        args.length && args !== undefined ? args[0] : function () {};
      let model = getFilteredRules();

      if (!model) {
        return true;
      }

      const validator = new Schema(model.rules);

      validator.validate(model.value, (errorMessage, field) => {
        if (errorMessage !== null && field !== null) {
          controlStatus.hasFeedback = true;
          controlStatus.errorMessage = errorMessage[0].message;

          formContext.addErrorField(field);
        } else {
          controlStatus.hasFeedback = false;
          controlStatus.errorMessage = null;

          formContext.removeErrorField(model.field);
        }

        callback(errorMessage, field);
      });
    };

    const renderInfoControl = () => {
      const { data } = instance;
      const { errorMessage } = controlStatus;

      const child = h(
        'div',
        {
          class: `${data.prefixClass}-control--info`,
        },
        errorMessage
      );

      return child;
    };

    const renderWrapperInputControl = (inputElement, infoElement) => {
      const { data } = instance;
      const { colspan, label } = props;
      let customClass = [`${data.prefixClass}-form-control--wrapper`];

      if (colspan) customClass.push(`col-${colspan}`);

      if (!label && !colspan) customClass.push(`col-full`);

      return h(
        'div',
        {
          class: customClass,
        },
        [inputElement, infoElement]
      );
    };

    const renderLabelControl = () => {
      const { data } = instance;
      const { label } = props;

      return h(
        'div',
        {
          class: `${data.prefixClass}-form-control--label`,
        },
        label
      );
    };

    const renderFormControl = children => {
      const { label } = props;
      const { data } = instance;
      const { hasFeedback } = controlStatus;
      let infoControl = null;
      let labelControl = null;

      let customClass = [`${data.prefixClass}-form-control`];

      if (hasFeedback) {
        customClass.push('has-feedback');
        infoControl = Transition(
          {
            name: 'slide-top',
            appear: true,
            duration: 400,
          },
          {
            slots: () => renderInfoControl(),
          }
        );
      }

      if (label) labelControl = renderLabelControl();

      return h(
        'div',
        {
          class: customClass.join(' '),
        },
        [labelControl, renderWrapperInputControl(children, infoControl)]
      );
    };

    onMounted(() => {
      const { addField } = formContext;

      if (typeof addField === 'function' && addField !== undefined)
        addField(instance.vnode);
    });

    return {
      onFieldChange,
      renderFormControl,
      validate,
    };
  },
  render() {
    let _this = this;
    let children = this.$slots['default']()[0];

    if (isVNode(children)) {
      let childListeners = getListeners(children);
      let childOnChange = childListeners?.onChange;

      children = cloneElement(children, {
        onChange: debounce((...args) => {
          if (childOnChange) {
            childOnChange(...args);
          }

          _this.onFieldChange();
        }),
      });
    }

    return h(_this.renderFormControl(children));
  },
});
