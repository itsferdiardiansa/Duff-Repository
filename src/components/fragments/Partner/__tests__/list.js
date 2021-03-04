import { mount } from '@vue/test-utils';
import List from '@fragment/Partner/List';
import partnerModule from '@store/modules/partner';
import { createStore } from 'vuex';

describe('fragment/Partner/List', () => {
  let store;

  beforeAll(() => {
    store = createStore({
      modules: {
        partner: partnerModule,
      },
    });
  });

  it('will render and match snapshot', async () => {
    const Component = mount(<List />, {
      global: {
        plugins: [store],
      },
    });

    await Component.vm.$store.dispatch('partner/fetchData', {
      page: 1,
      limit: 10,
    });
    expect(Component.html()).toMatchSnapshot();
  });
});
