import { RouterLink } from 'vue-router';
import { config } from '@vue/test-utils';
import { FontAwesomeIcon } from '@plugin/fontAwesome';
import registerRequireContextHook from 'babel-plugin-require-context-hook/register';
import { AlertPlugin } from '@plugin/alert';
import globalSetting from '@plugin/globalSetting';
import './setupEnvVars';
import './setupMockModule';

registerRequireContextHook();

config.global = {
  components: {
    'font-awesome-icon': FontAwesomeIcon,
    'router-link': RouterLink,
  },
  mixins: [globalSetting],
};

config.plugins.VueWrapper.install(AlertPlugin);

global.$handleClick = jest.fn();
