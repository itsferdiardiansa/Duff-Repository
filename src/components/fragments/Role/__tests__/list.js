import { mount } from '@vue/test-utils';
import { createStore } from 'vuex';
import List from '@fragment/Role/List';
import roleModule from '@store/modules/role';

describe('fragment/Role/List', () => {
  let store;

  beforeAll(() => {
    store = createStore({
      modules: {
        role: roleModule,
      },
    });
  });

  it('will render and match snapshot', async () => {
    const Component = mount(<List />, {
      global: {
        plugins: [store],
      },
    });

    await Component.vm.$store.dispatch('role/fetchData', {
      page: 1,
      limit: 10,
    });
    expect(Component.html()).toMatchSnapshot();
  });
});
