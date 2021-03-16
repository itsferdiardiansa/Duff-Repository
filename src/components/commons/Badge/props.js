export default {
  label: {
    type: [String, Number],
    default: '',
  },
  inverse: {
    type: Boolean,
    default: false,
  },
  variant: {
    type: String,
    default: 'light',
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
  size: {
    type: String,
    default: 'xs',
    validator: function (variant) {
      return ~['xs', 'sm', 'base', 'lg', 'xl'].indexOf(variant);
    },
  },
  icon: {
    type: Array,
    default: () => [],
  },
  bold: {
    type: Boolean,
    default: true,
  },
  rounded: {
    type: Boolean,
    default: true,
  },
  pill: {
    type: Boolean,
    default: false,
  },
  dot: {
    type: Boolean,
    default: false,
  },
};
