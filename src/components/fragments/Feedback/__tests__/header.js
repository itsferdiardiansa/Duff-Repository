import { mount } from '@vue/test-utils';
import Header from '@fragment/Feedback/Header';

describe('fragment/Feedback/Header', () => {
  it('will render and match snapshot', async () => {
    const Component = mount(<Header />);

    expect(Component.find('h2').html()).toContain('Feedback Data');
    expect(Component.html()).toMatchSnapshot();
  });
});
