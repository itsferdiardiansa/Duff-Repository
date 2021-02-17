import { RouterLink } from 'vue-router';
import { config } from '@vue/test-utils';
import { FontAwesomeIcon } from '@plugin/fontAwesome';
import registerRequireContextHook from 'babel-plugin-require-context-hook/register';
import { AlertPlugin } from '@plugin/alert';
import globalSetting from '@plugin/globalSetting';
import store from '@store';
import './setupEnvVars';
import './storeMock';
import './routerMock';

registerRequireContextHook();

const mockRoute = {
  path: '/',
};
const mockRouter = {
  push: jest.fn(),
};

config.global = {
  components: {
    'font-awesome-icon': FontAwesomeIcon,
    'router-link': RouterLink,
  },
  mixins: [globalSetting],
  mocks: {
    $route: mockRoute,
    $router: mockRouter,
  },
  plugins: [store],
};

config.plugins.VueWrapper.install(AlertPlugin);

global.$handleClick = jest.fn();
