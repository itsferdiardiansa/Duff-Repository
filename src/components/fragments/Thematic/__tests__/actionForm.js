import { mount } from '@vue/test-utils';
import { createStore } from 'vuex';
import AppWrapper from '@base/AppWrapper';
import ActionForm from '@fragment/Thematic/ActionForm';
import thematicModule from '@store/modules/thematicPage';

describe('fragment/Thematic/ActionForm', () => {
  let store;

  beforeAll(() => {
    store = createStore({
      modules: {
        thematicPage: thematicModule,
      },
    });
  });

  it('will render and match snapshot', () => {
    const Component = mount(<ActionForm />, {
      global: { plugins: [store], stubs: ['ColorPicker'] },
    });

    expect(Component.element).toMatchSnapshot();
  });

  it('will render with error validation on all fields and match snapshot', async () => {
    const Component = mount(<ActionForm />, { global: { plugins: [store] } });

    await Component.find('form').trigger('submit.prevent');

    // Total fields is 9 and should be 9
    const errorFields = Component.findAll(
      `.${Component.rootVM.prefixClass}-control--info`
    );

    expect(errorFields.length).toBe(9);

    await Component.vm.$nextTick(() => {
      expect(Component.element).toMatchSnapshot();
    });
  });

  it('will post data on success and bring up an alert then redirect it to the list', async () => {
    const Component = mount(
      <AppWrapper>
        <ActionForm />
      </AppWrapper>,
      { global: { plugins: [store], stubs: ['ColorPicker'] } }
    );

    const data = {};

    await Component.vm.$store.dispatch('thematicPage/postData', {
      action: 'form.create',
      redirectUrl: '/thematic-page',
      data,
    });
    expect(document.body).toMatchSnapshot();
    expect(mockRouterPush).toHaveBeenCalledWith('/thematic-page');
  });

  it('will post data on failed and bring up an alert', async () => {
    const Component = mount(
      <AppWrapper>
        <ActionForm />
      </AppWrapper>,
      { global: { plugins: [store], stubs: ['ColorPicker'] } }
    );

    mockCreateThematic.mockReset();
    mockCreateThematic.mockRejectedValue({
      message: 'internal.error',
      result: {},
    });

    await Component.vm.$store.dispatch('thematicPage/postData', {
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
      is_active: '1',
      logo: '/9xbg6dsds==', // base64 format
    };
    const Component = mount(
      <AppWrapper>
        <ActionForm model={formData} onSubmit={handleSubmit} />
      </AppWrapper>,
      {
        props: { withValidation: false },
        global: { plugins: [store], stubs: ['ColorPicker'] },
      }
    );

    await Component.find('form').trigger('submit.prevent');

    expect(handleSubmit).toHaveBeenCalled();
  });

  it('will render the spinner during the request process', async () => {
    const Component = mount(<ActionForm />, {
      props: { isFetching: true },
      global: { plugins: [store], stubs: ['ColorPicker'] },
    });

    expect(
      Component.find(
        `[type="submit"] .${Component.rootVM.prefixClass}-button--spinner`
      ).exists()
    ).toBeTruthy();
    expect(Component.element).toMatchSnapshot();
  });

  it('will render the text and color for the form update', async () => {
    const Component = mount(<ActionForm />, {
      props: { isCreate: false },
      global: { plugins: [store], stubs: ['ColorPicker'] },
    });

    expect(Component.find(`[type="submit"]`).text()).toEqual('Update');
    expect(Component.find(`[type="submit"]`).attributes('class')).toContain(
      `${Component.rootVM.prefixClass}-button--warning`
    );
    expect(Component.element).toMatchSnapshot();
  });

  it('will overide local data when in update mode', async () => {
    const formData = {
      tagline: 'tagline',
      site: 'https://google.com',
      description: '<p>Type your description here</p>',
      position: '1',
    };
    const Component = mount(<ActionForm />, {
      props: { data: formData, isCreate: false },
      global: {
        plugins: [store],
        stubs: ['ColorPicker'],
      },
    });

    expect(Component.vm.state.form).toMatchObject(formData);
    expect(Component.vm.state).toMatchSnapshot();
  });

  it('will execute the form without validation', async () => {
    const handleSubmit = jest.fn();
    const Component = mount(<ActionForm onSubmit={handleSubmit} />, {
      props: { withValidation: false },
      global: {
        plugins: [store],
        stubs: ['ColorPicker'],
      },
    });

    await Component.find('form').trigger('submit.prevent');

    expect(handleSubmit).toHaveBeenCalled();
  });
});
