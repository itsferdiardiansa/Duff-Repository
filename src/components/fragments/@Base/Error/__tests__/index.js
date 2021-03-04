import { mount } from '@vue/test-utils';
import Error from '@base/Error';

describe('fragment/Base/Error', () => {
  it('will render and match snapshot', () => {
    const Component = mount(<Error />);

    expect(Component.html()).toMatchSnapshot();
  });

  it('will trigger event and reload the oage', async () => {
    delete global.window.location;
    global.window = Object.create(window);
    global.window.location = {
      reload: jest.fn(),
    };

    const Component = mount(<Error />);

    await Component.find('button').trigger('click');
    expect(window.location.reload).toHaveBeenCalled();
  });
});
