import { mount } from '@vue/test-utils';
import List from '@fragment/Footer/List';
import footerModule from '@store/modules/footer';
import { createStore } from 'vuex';

describe('fragment/Footer/List', () => {
  let store;

  beforeAll(() => {
    store = createStore({
      modules: {
        footer: footerModule,
      },
    });
  });

  it('will render and match snapshot', async () => {
    const Component = mount(<List />, {
      global: {
        plugins: [store],
      },
    });

    await Component.vm.$store.dispatch('footer/fetchData', {
      page: 1,
      limit: 10,
    });
    expect(Component.html()).toMatchSnapshot();
  });
});
