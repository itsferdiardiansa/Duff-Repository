/* eslint-disable */
import { createApp, inject } from 'vue';
import Alert from './components/Alert';
import globalSetting from '@plugin/globalSetting';
import { FontAwesomeIcon } from '@plugin/fontAwesome';
import Emitter from 'mitt';
import uuid from '@util/uuid';

const createElement = (instance, app) => {
  const root = document.querySelector('#app');
  const div = document.createElement('div');
  const elementId = uuid(`${SATPAM_PREFIX_CLASS}-alert`);

  div.setAttribute('id', elementId);
  div.setAttribute('role', 'alert');
  // console.log(root.innerHTML)

  // document.removeChild(alertEl)
  // document.getElementsByTagName('role="alert"').remove()
  // if(alertEl !== null) return false
  // console.log('alert', Object.keys(alertEl), alertEl._vnode)
  // if(alertEl) return false
  root.appendChild(div);

  return elementId;
};

export const AlertPlugin = app => {
  const alertEl = document.querySelector('[role="alert"]');
  let rootContainer;
  let instance;

  if (alertEl) return false;

  const $alert = {
    show: (...args) => {
      let { $emitter } = instance._context.provides;

      $emitter.emit('show-alert', ...args);
    },
    init: async () => {
      try {
        rootContainer = await app;
        instance = createApp(Alert);

        instance.mixin(globalSetting);
        instance.component('FontAwesomeIcon', FontAwesomeIcon);
        instance.provide('$emitter', new Emitter());

        const elementId = createElement(instance, app);

        if (elementId) instance.mount(`#${elementId}`);
      } catch (error) {
        console.error("We're failed to create alert", error);
      }
    },
  };

  $alert.init();

  window.$alert = $alert;
};

export default {
  install: AlertPlugin,
};
