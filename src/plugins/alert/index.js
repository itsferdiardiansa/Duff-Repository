/* eslint-disable */
import { createApp, inject } from 'vue';
import Alert from './components/Alert';
import globalSetting from '@plugin/globalSetting';
import { FontAwesomeIcon } from '@plugin/fontAwesome';
import Emitter from 'mitt';
import uuid from '@util/uuid';
import './styles.scss';

const createElement = (instance, app) => {
  const root = document.querySelector('body');
  const div = document.createElement('div');
  const elementId = uuid(`${SATPAM_PREFIX_CLASS}-alert`);

  div.setAttribute('id', elementId);
  div.setAttribute('role', 'alert');
  div.setAttribute('class', `${SATPAM_PREFIX_CLASS}-alert-container`);

  root.appendChild(div);

  return elementId;
};

export const AlertPlugin = app => {
  const alertEl = document.querySelector('[role="alert"]');
  let rootContainer;
  let instance;

  if (alertEl) return false;

  const alertContext = {
    show: (...args) => {
      const {
        alertContext: { emitter },
      } = instance._context.provides;

      emitter.emit('show-alert', ...args);
    },
    init: async () => {
      try {
        const items = [];
        rootContainer = await app;
        instance = createApp(Alert);

        instance.mixin(globalSetting);
        instance.component('FontAwesomeIcon', FontAwesomeIcon);
        instance.provide('alertContext', {
          emitter: new Emitter(),
          items,
        });

        const elementId = createElement(instance, app);

        if (elementId) instance.mount(`#${elementId}`);
      } catch (error) {
        console.error("We're failed to create alert", error);
      }
    },
  };

  alertContext.init();

  window.$alert = alertContext;
  window.sAlert = alertContext;
};

export default {
  install: AlertPlugin,
};
