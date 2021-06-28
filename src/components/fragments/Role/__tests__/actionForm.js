import { mount } from '@vue/test-utils';
import { createStore } from 'vuex';
import AppWrapper from '@base/AppWrapper';
import ActionForm from '@fragment/Role/ActionForm';
import roleModule from '@store/modules/role';

describe('fragment/Role/ActionForm', () => {
  let store;

  beforeAll(() => {
    store = createStore({
      modules: {
        role: roleModule,
      },
    });
  });

  it('will render and match snapshot', () => {
    const Component = mount(<ActionForm />, {
      global: {
        plugins: [store],
      },
    });

    expect(Component.element).toMatchSnapshot();
  });

  it('will render with error validation on all fields and match snapshot', async () => {
    const Component = mount(<ActionForm />, {
      global: {
        plugins: [store],
      },
    });

    await Component.find('form').trigger('submit.prevent');

    const errorFields = Component.findAll(
      `.${Component.rootVM.prefixClass}-control--info`
    );

    expect(errorFields.length).toBe(2);

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

    await Component.vm.$store.dispatch('role/postData', {
      action: 'form.create',
      redirectUrl: '/role',
      data,
    });
    expect(document.body).toMatchSnapshot();
    expect(mockRouterPush).toHaveBeenCalledWith('/role');
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

    mockCreateRole.mockReset();
    mockCreateRole.mockRejectedValue({
      message: 'internal.error',
      result: {},
    });

    await Component.vm.$store.dispatch('role/postData', {
      action: 'form.create',
    });

    expect(document.body).toMatchSnapshot();
  });

  it('will submit by pinning props as a callback', async () => {
    const handleSubmit = jest.fn();
    const formData = {
      name: 'Role name',
      privileges: [],
    };
    const Component = mount(
      <ActionForm model={formData} onSubmit={handleSubmit} />,
      {
        global: {
          plugins: [store],
        },
        props: { withValidation: false },
      }
    );

    await Component.find('form').trigger('submit.prevent');

    expect(handleSubmit).toHaveBeenCalled();
  });

  it('will render the spinner during the request process', async () => {
    const Component = mount(<ActionForm />, {
      global: {
        plugins: [store],
      },
      props: { isFetching: true },
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
      global: {
        plugins: [store],
      },
      props: { isCreate: false },
    });

    expect(Component.find(`[type="submit"]`).text()).toEqual('Update');
    expect(Component.find(`[type="submit"]`).attributes('class')).toContain(
      `${Component.rootVM.prefixClass}-button--orange`
    );
    expect(Component.element).toMatchSnapshot();
  });

  // it('will overide local data when in update mode', async () => {
  //   const formData = {
  //     name: 'Role name has been update',
  //     privileges: [{id_privileges: 202}],
  //   };
  //   const Component = mount(<ActionForm />, {
  //     global: {
  //       plugins: [store],
  //     },
  //     props: { data: formData, isCreate: false },
  //   });

  //   expect(Component.vm.state.form).toMatchObject({
  //     name: 'Role name has been update',
  //     privileges: []
  //   });
  //   expect(Component.vm.state).toMatchSnapshot();
  // });

  it('will execute the form without validation', async () => {
    const handleSubmit = jest.fn();
    const Component = mount(<ActionForm onSubmit={handleSubmit} />, {
      global: {
        plugins: [store],
      },
      props: { withValidation: false },
    });

    await Component.find('form').trigger('submit.prevent');

    expect(handleSubmit).toHaveBeenCalled();
  });
});
