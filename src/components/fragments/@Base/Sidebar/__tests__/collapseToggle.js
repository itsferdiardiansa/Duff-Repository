import { mount } from '@vue/test-utils';
import { createStore } from 'vuex';
import { ref } from 'vue';
import CollapseToggle from '@base/Sidebar/CollapseToggle';
import appModule from '@store/modules/app';

describe('fragment/Base/Sidebar/CollapseToggle', () => {
  let store;

  beforeAll(() => {
    store = createStore({
      modules: {
        app: appModule,
      },
    });
  });
  it('will render, trigger click event and match snapshot', async () => {
    const toggleCollapse = jest.fn();
    const Component = mount(<CollapseToggle />, {
      global: {
        plugins: [store],
        stubs: ['router-link'],
        provide: {
          isCollapsed: false,
          appContext: {
            isCollapsed: ref(true),
            toggleCollapseSidebar: toggleCollapse,
          },
        },
      },
    });

    await Component.find('.collapse-toggle--container').trigger('click');

    expect(toggleCollapse).toHaveBeenCalled();
    expect(Component.html()).toMatchSnapshot();
  });
});
