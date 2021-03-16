import { mount } from '@vue/test-utils';
import { createStore } from 'vuex';
import AppWrapper from '@base/AppWrapper';
import ActionForm from '@fragment/Partner/ActionForm';
import partnerModules from '@store/modules/partner';

describe('fragment/Partner/ActionForm', () => {
  let store;

  beforeAll(() => {
    store = createStore({
      modules: {
        partner: partnerModules,
      },
    });
  });

  it('will render and match snapshot', () => {
    const Component = mount(<ActionForm />);

    expect(Component.element).toMatchSnapshot();
  });

  it('will render with error validation on all fields and match snapshot', async () => {
    const Component = mount(<ActionForm />);

    await Component.find('form').trigger('submit.prevent');

    // Total fields is 7 and shl=ould be 6
    const errorFields = Component.findAll(
      `.${Component.rootVM.prefixClass}-control--info`
    );

    expect(errorFields.length).toBe(6);

    await Component.vm.$nextTick(() => {
      expect(Component.element).toMatchSnapshot();
    });
  });

  it('will post data on success and bring up an alert then redirect it to the list', async () => {
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

    const data = {};

    await Component.vm.$store.dispatch('partner/postData', {
      data,
      action: 'form.create',
      redirectUrl: '/partner',
    });
    expect(document.body).toMatchSnapshot();
    expect(mockRouterPush).toHaveBeenCalledWith('/partner');
  });

  it('will post data on failed and bring up an alert', async () => {
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

    mockCreatePartner.mockReset();
    mockCreatePartner.mockRejectedValue({
      message: 'internal.error',
      result: {},
    });

    await Component.vm.$store.dispatch('partner/postData', {
      action: 'form.create',
    });

    expect(document.body).toMatchSnapshot();
  });

  it('will submit by pinning props as a callback', async () => {
    const handleSubmit = jest.fn();
    const formData = {
      tagline: 'tagline',
      site: 'https://google.com',
      description: '<p>Type your description here</p>',
      position: '1',
      ldp_id: '123456',
      is_active: '1',
      logo: '/9xbg6dsds==', // base64 format
      hero: '/7343bxx==', // base64 format
    };
    const Component = mount(
      <ActionForm model={formData} onSubmit={handleSubmit} />,
      { props: { withValidation: false } }
    );

    await Component.find('form').trigger('submit.prevent');

    expect(handleSubmit).toHaveBeenCalled();
  });

  it('will render the spinner during the request process', async () => {
    const Component = mount(<ActionForm />, { props: { isFetching: true } });

    expect(
      Component.find(
        `[type="submit"] .${Component.rootVM.prefixClass}-button--spinner`
      ).exists()
    ).toBeTruthy();
    expect(Component.element).toMatchSnapshot();
  });

  it('will render the text and color for the form update', async () => {
    const Component = mount(<ActionForm />, { props: { isCreate: false } });

    expect(Component.find(`[type="submit"]`).text()).toEqual('Update');
    expect(Component.find(`[type="submit"]`).attributes('class')).toContain(
      `${Component.rootVM.prefixClass}-button--orange`
    );
    expect(Component.element).toMatchSnapshot();
  });

  it('will overide local data when in update mode', async () => {
    const formData = {
      tagline: 'tagline',
      site: 'https://google.com',
      description: '<p>Type your description here</p>',
      position: '1',
      ldp_id: '123456',
      is_active: '1',
      logo: '/9xbg6dsds==', // base64 format
      hero: '/7343bxx==', // base64 format
    };
    const Component = mount(<ActionForm />, {
      props: { data: formData, isCreate: false },
    });

    expect(Component.vm.state.form).toMatchObject(formData);
    expect(Component.vm.state).toMatchSnapshot();
  });

  it('will execute the form without validation', async () => {
    const handleSubmit = jest.fn();
    const Component = mount(<ActionForm onSubmit={handleSubmit} />, {
      props: { withValidation: false },
    });

    await Component.find('form').trigger('submit.prevent');

    expect(handleSubmit).toHaveBeenCalled();
  });
});
