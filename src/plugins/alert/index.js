import { createApp } from 'vue'
import Alert from './components/Alert'
import globalSetting from '@plugin/globalSetting'
import { FontAwesomeIcon } from '@plugin/fontAwesome'
import Emitter from 'mitt'
import uuid from '@util/uuid'

const createElement = () => {
  const root = document.querySelector('#app')
  const div = document.createElement('div')
  const elementId = uuid('lk-alert')
  
  div.setAttribute('id', elementId)

  root.appendChild(div)

  return elementId
}

export const AlertPlugin = (app) => {
  let rootContainer
  let instance
  
  const $alert = {
    show: (...args) => {
      let { $emitter } = instance._context.provides
      
      $emitter.emit('show-alert', ...args)
    },
    init: async () => {
      try {
        rootContainer = await app
        instance = createApp(Alert)
        
        const elementId = createElement(rootContainer, app)
        
        instance.mixin(globalSetting)
        
        instance.component('FontAwesomeIcon', FontAwesomeIcon)
        
        instance.provide('$emitter', new Emitter())

        instance.mount(`#${elementId}`)
      } catch(error) {
        console.error('We\'re failed to create alert', error)
      }
    }
  }

  $alert.init()

  window.$alert = $alert
}

export default {
  install: AlertPlugin
}