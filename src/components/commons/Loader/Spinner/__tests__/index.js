import { mount } from '@vue/test-utils';
import Spinner from '@common/Loader/Spinner';

describe('common/Loader/Spinner', () => {
  it('will render and match snapshot', () => {
    const props = {
      width: 10,
      height: 10,
    };

    const Component = mount(<Spinner {...props} />);

    expect(Component.element).toMatchSnapshot();
  });
});
