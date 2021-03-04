import { mount } from '@vue/test-utils';
import List from '@fragment/ListAdmin/List';
import adminModule from '@store/modules/admin';
import { createStore } from 'vuex';

describe('fragment/Admin/List', () => {
  let store;

  beforeAll(() => {
    store = createStore({
      modules: {
        admin: adminModule,
      },
    });
  });

  it('will render and match snapshot', async () => {
    const Component = mount(<List />, {
      global: {
        plugins: [store],
      },
    });

    await Component.vm.$store.dispatch('admin/fetchData', {
      page: 1,
      limit: 10,
    });
    expect(Component.html()).toMatchSnapshot();
  });
});
