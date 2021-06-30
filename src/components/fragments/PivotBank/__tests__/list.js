import { mount } from '@vue/test-utils';
import { createStore } from 'vuex';
import List from '@fragment/Hero/List';
import heroModule from '@store/modules/hero';

describe('fragment/Hero/List', () => {
  let store;

  beforeAll(() => {
    store = createStore({
      modules: {
        hero: heroModule,
      },
    });
  });

  it('will render and match snapshot', async () => {
    const Component = mount(<List />, {
      global: {
        plugins: [store],
      },
    });

    await Component.vm.$store.dispatch('hero/fetchData', {
      page: 1,
      limit: 10,
    });
    expect(Component.html()).toMatchSnapshot();
  });
});
