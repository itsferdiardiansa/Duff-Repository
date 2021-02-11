export default {
  label: {
    type: String,
    default: '',
  },
  inverse: {
    type: Boolean,
    default: false
  },
  variant: {
    type: String,
    default: 'light',
    validator: function(variant) {
      return ~['primary', 'danger', 'warning', 'dark', 'success', 'light'].indexOf(variant)
    }
  },
  size: {
    type: String,
    default: 'base',
    validator: function(variant) {
      return ~['xs', 'sm', 'base', 'lg', 'xl'].indexOf(variant)
    }
  },
  icon: {
    type: Array,
    default: () => []
  },
  bold: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  rounded: {
    type: Boolean,
    default: true,
  },
  pill: {
    type: Boolean,
    default: false
  },
}