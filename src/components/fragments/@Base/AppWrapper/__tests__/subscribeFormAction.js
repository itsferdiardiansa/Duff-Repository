import { mount } from '@vue/test-utils';
import { createStore } from 'vuex';
import AppWrapper from '@base/AppWrapper';
import Badge from '@common/Badge';
import heroModule from '@store/modules/hero';

describe('fragment/AppWrapper/subscribeFormAction', () => {
  let Component, store, alertElement, prefixClass;

  beforeAll(() => {
    store = createStore({
      modules: {
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
        },
      }
    );

    prefixClass = Component.rootVM.prefixClass;
  });

  it('will render children and match snapshot', () => {
    expect(Component.html()).toMatchSnapshot();
  });

  it('will not display a success alert when the request body has not action properties', async () => {
    const data = { title: 'Its ferdi' };

    await Component.vm.$store.dispatch('hero/postData', {
      redirectUrl: '/hero',
      data,
    });

    expect(
      document.body.querySelector(`.${Component.rootVM.prefixClass}-alert`)
    ).toBeFalsy();
    expect(document.body).toMatchSnapshot();
  });

  it('will display a success alert when the request is successful', async () => {
    const data = { title: 'Its ferdi' };

    await Component.vm.$store.dispatch('hero/postData', {
      action: 'form.create',
      redirectUrl: '/hero',
      data,
    });

    expect(document.body).toMatchSnapshot();
  });

  it('will display a danger alert when the request fails', async () => {
    const Component = mount(
      <AppWrapper>
        <ActionForm />
      </AppWrapper>,
      {
        global: {
          plugins: [store],
        },
      }
    );

    mockCreateHero.mockReset();
    mockCreateHero.mockRejectedValue({
      message: 'internal.error',
      result: {},
    });

    await Component.vm.$store.dispatch('hero/postData', {
      action: 'form.create',
    });

    expect(
      document.body.querySelector(
        `.${Component.rootVM.prefixClass}-alert--danger`
      )
    ).toBeTruthy();
    expect(document.body).toMatchSnapshot();
  });
});
