import { mount } from '@vue/test-utils';
import Loading from '@base/Loading';

describe('fragment/Base/Loading', () => {
  it('will render and match snapshot', async () => {
    const Component = mount(<Loading />);

    expect(Component.find('h1').html()).toContain('Please wait');
    expect(Component.html()).toMatchSnapshot();
  });
});
