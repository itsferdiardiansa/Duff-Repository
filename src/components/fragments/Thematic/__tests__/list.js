import { mount } from '@vue/test-utils';
import List from '@fragment/Thematic/List';
import thematicModule from '@store/modules/thematicPage';
import { createStore } from 'vuex';

describe('fragment/Thematic/List', () => {
  let store;

  beforeAll(() => {
    store = createStore({
      modules: {
        thematicPage: thematicModule,
      },
    });
  });

  it('will render and match snapshot', async () => {
    const Component = mount(<List />, {
      global: {
        plugins: [store],
      },
    });

    await Component.vm.$store.dispatch('thematicPage/fetchData', {
      page: 1,
      limit: 10,
    });
    expect(Component.html()).toMatchSnapshot();
  });
});
