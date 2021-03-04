import { mount } from '@vue/test-utils';
import { createStore } from 'vuex';
import List from '@fragment/Feedback/List';
import feedbackModule from '@store/modules/Feedback';

describe('fragment/Feedback/List', () => {
  let store;

  beforeAll(() => {
    store = createStore({
      modules: {
        feedback: feedbackModule,
      },
    });
  });

  it('will render and match snapshot', async () => {
    const Component = mount(<List />, {
      global: {
        plugins: [store],
      },
    });

    await Component.vm.$store.dispatch('feedback/fetchData', {
      page: 1,
      limit: 10,
    });
    expect(Component.html()).toMatchSnapshot();
  });
});
