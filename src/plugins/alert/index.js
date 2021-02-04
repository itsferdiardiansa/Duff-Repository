
import { createApp } from 'vue'
import Alert from '@common/Alert'
import globalSetting from '@plugin/globalSetting'
import { FontAwesomeIcon } from '@plugin/fontAwesome'
import Emitter from 'mitt'

const createElement = (rootContainer, app) => {
  const root = rootContainer._container
  const div = document.createElement('div')
  const uuid = `lk-alert-${app._component.__hmrId}-${new Date().getTime()}`

  div.setAttribute('id', uuid)

  root.appendChild(div)

  return uuid
}

const AlertPlugin = {
  install: (app) => {
    if(app.config.globalProperties.$alert) 
      return

    let rootContainer
    let appAlert
    
    const $alert = {
      show: (...args) => {
        let { $emitter } = appAlert._context.provides
        
        $emitter.emit('show-alert', ...args)
      },
      init: async () => {
        rootContainer = await app
        appAlert = createApp(Alert)
        
        const uuid = createElement(rootContainer, app)
        
        appAlert.mixin(globalSetting)
        
        appAlert.component('FontAwesomeIcon', FontAwesomeIcon)
        
        appAlert.provide('$emitter', new Emitter())

        appAlert.mount(`#${uuid}`)
      }
    }

    $alert.init()

    window.$alert = $alert
  }
}

export default AlertPlugin