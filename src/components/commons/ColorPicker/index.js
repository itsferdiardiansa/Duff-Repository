/* eslint-disable */
import { defineComponent, getCurrentInstance, h, onMounted, ref } from 'vue'
import Pickr from '@simonwep/pickr'
import uuid from '@util/uuid'
import defaultConfig from './defaultConfig'
import '@simonwep/pickr/dist/themes/nano.min.css'
import '@common/Form/style.scss'

export default defineComponent({
  props: {
    id: {
      type: [Number, String]
    },
    init: {
      type: Object,
      default: () => {}
    },
    modelAction: {
      type: String
    },
    modelValue: {
      type: String
    },
    label: {
      type: String
    },
    inline: {
      type: Boolean,
      default: true
    }
  },
  emits: [
    'update:modelValue'
  ],
  setup(props, context) {
    let root = getCurrentInstance()
    let element = ref(null)
    let label = props.label || ''
    let inline = props.inline
    let elementId = props.id || uuid('lk-color-picker')
    let modelBind = !!context.attrs['onUpdate:modelValue']
    let pickrPlugin = null
    let modelAction = props.modelAction || 'save'
    let eventList = ['save', 'change', 'swatchselect']
    let formatColor = props.formatColor || 'HEXA'
    let defaultColor = props.modelValue || '#42445a'
    let selectedColor

    let initElement = () => {
      let config = {
        el: `#${elementId}`,
        theme: 'nano',
        swatches: defaultConfig.swatches,
        components: defaultConfig.components,
        ...props.init
      }

      pickrPlugin = Pickr.create(config)
    }

    let initModelBind = () => {
      let _actionEvent = ~eventList.indexOf(modelAction) ? modelAction : 'save'

      eventList.forEach(event => {
        if(event === _actionEvent) 
          pickrPlugin.on(event, (color, instance) => {
            const exec = `color.to${formatColor}().toString()`
            
            selectedColor = eval(exec)
            context.emit('update:modelValue', selectedColor)
          })
      })

      pickrPlugin.on('init', instance => {
        instance.setColor(defaultColor)

        selectedColor = defaultColor
      })
    }

    onMounted(() => {
      if(Pickr !== null || Pickr !== undefined) {
        initElement()

        initModelBind()
      }
      else
        console.warn('Were failed to load Pickr')
    })
    
    
    const renderInline = () => {
      return  h('div', { id: elementId, ref: element })
    }
    
    const renderWithGroup = () => {
      const { prefixClass } = root.data

      return h('div', {
          class: `${prefixClass}-form-control`,
        }, [
          h('label', {
            class: `${prefixClass}-form-control--label`
          }, label),
          h('div', {
            class: 'w-full relative'
          }, renderInline())
        ]
      )
    }

    return () => {
      return inline ? renderInline() : renderWithGroup()
    }
  }
})