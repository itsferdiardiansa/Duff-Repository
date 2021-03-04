import { mount } from '@vue/test-utils';
import { createStore } from 'vuex';
import List from '@fragment/Notification/List';
import notificationModule from '@store/modules/notification';

describe('fragment/Notification/List', () => {
  let store;

  beforeAll(() => {
    store = createStore({
      modules: {
        notification: notificationModule,
      },
    });
  });

  it('will render and match snapshot', async () => {
    const Component = mount(<List />, {
      global: {
        plugins: [store],
      },
    });

    await Component.vm.$store.dispatch('notification/fetchData', {
      page: 1,
      limit: 10,
    });
    expect(Component.html()).toMatchSnapshot();
  });
});
