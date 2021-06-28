import { RouterLink } from 'vue-router';
import { config } from '@vue/test-utils';
import { FontAwesomeIcon } from '@plugin/fontAwesome';
import registerRequireContextHook from 'babel-plugin-require-context-hook/register';
import { NotificationPlugin } from '@plugin/notification';
import globalSetting from '@plugin/globalSetting';
import registerMockModule from './setupMockModule';
import setupEnvVars from './setupEnvVars';
import register from 'ignore-styles';

register(['.css', '.sass', '.scss']);
setupEnvVars();
registerRequireContextHook();
registerMockModule();

jest.mock('@util/uuid', () => jest.fn(() => 'plugin__12e5'));

config.global = {
  components: {
    'font-awesome-icon': FontAwesomeIcon,
    'router-link': RouterLink,
  },
  mixins: [globalSetting],
};

config.plugins.VueWrapper.install(NotificationPlugin);
