import { mount } from '@vue/test-utils';
import { createStore } from 'vuex';
import AppWrapper from '@base/AppWrapper';
import Badge from '@common/Badge';
import userModule from '@store/modules/user';
import heroModule from '@store/modules/hero';

jest.useFakeTimers();

describe('fragment/AppWrapper/subscribeAuthAction', () => {
  let Component, store, prefixClass;

  beforeAll(() => {
    store = createStore({
      modules: {
        user: userModule,
        hero: heroModule,
      },
    });

    Component = mount(
      <AppWrapper>
        <Badge label="its_ferdi" variant="success" />
      </AppWrapper>,
      {
        global: {
          plugins: [store],
          stubs: ['transition'],
        },
      }
    );

    prefixClass = Component.rootVM.prefixClass;
  });

  it('will render children and match snapshot', () => {
    expect(Component.html()).toMatchSnapshot();
  });

  it('will show an alert success when successfully login', async () => {
    await Component.vm.$store.dispatch('user/doLogin', {
      email: 'its_ferdi@go-jek.com',
      password: 'KMZWAY87AA',
    });

    expect(document.querySelector('label').innerHTML).toEqual(
      'Welcome aboard!'
    );
    expect(document.body).toMatchSnapshot();
  });

  it('will show an alert success when user logout', async () => {
    await Component.vm.$store.dispatch('user/doLogout');

    expect(mockRouterPush).toHaveBeenLastCalledWith('/login');
  });
});
