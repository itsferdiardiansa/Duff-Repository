import { mount } from '@vue/test-utils';
import { createStore } from 'vuex';
import { ref } from 'vue';
import AppLogo from '@base/Sidebar/AppLogo';
import appModule from '@store/modules/app';

describe('fragment/Base/Sidebar/AppLogo', () => {
  let store;

  beforeAll(() => {
    store = createStore({
      modules: {
        app: appModule,
      },
    });
  });
  it('will render and match snapshot', async () => {
    const Component = mount(<AppLogo />, {
      global: {
        plugins: [store],
        stubs: ['router-link'],
        provide: {
          isCollapsed: false,
          sidebarContext: {
            isCollapsed: ref(true),
            toggleCollapseSidebar: jest.fn(),
          },
        },
      },
    });

    expect(Component.html()).toMatchSnapshot();
  });

  it('will render collapse view and match snapshot', async () => {
    const Component = mount(<AppLogo />, {
      global: {
        plugins: [store],
        stubs: ['router-link'],
        provide: {
          sidebarContext: {
            isCollapsed: ref(true),
            toggleCollapseSidebar: jest.fn(),
          },
        },
      },
    });

    expect(Component.find('.app-logo.mono').exists()).toBeTruthy();
    expect(Component.html()).toMatchSnapshot();
  });
});
