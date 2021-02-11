import { config } from '@vue/test-utils'
import { FontAwesomeIcon } from '@plugin/fontAwesome'
import { AlertPlugin } from '@plugin/alert'
import globalSetting from '@plugin/globalSetting'
import { RouterLink } from 'vue-router'
import './routerMock'

const mockRoute = {
  path: '/',
}
const mockRouter = {
  push: jest.fn(),
}

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
  // plugins: [router]
}

config.plugins.VueWrapper.install(AlertPlugin)

global.$handleClick = jest.fn()
