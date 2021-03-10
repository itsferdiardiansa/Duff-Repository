import { mount } from '@vue/test-utils';
import { createStore } from 'vuex';
import AppWrapper from '@base/AppWrapper';
import Badge from '@common/Badge';
import appModule from '@store/modules/app';

describe('fragment/AppWrapper', () => {
  let Component, store, alertElement, prefixClass;

  beforeAll(() => {
    store = createStore({
      modules: {
        app: appModule,
      },
    });

    Component = mount(
      <AppWrapper>
        <Badge label="its_ferdi" variant="success" />
      </AppWrapper>,
      {
        global: {
          plugins: [store],
        },
      }
    );

    prefixClass = Component.rootVM.prefixClass;
  });

  it('will render children and match snapshot', () => {
    expect(Component.html()).toMatchSnapshot();
  });

  it('will render loading when progress fetch chunks', async () => {
    await Component.vm.$store.dispatch('app/progressChunkLoad');

    expect(Component.find('h1').text()).toEqual('Please wait');
    expect(Component.html()).toMatchSnapshot();
  });

  it('will render error when progress fetch chunks fail', async () => {
    await Component.vm.$store.dispatch('app/progressChunkFailed');

    expect(Component.find('h1').text()).toEqual(
      'Sorry there is a problem with our system'
    );
    expect(Component.find('p').text()).toEqual(
      'Wait a minute, let me clean up. Please try again or come back later.'
    );
    expect(Component.html()).toMatchSnapshot();
  });
});
