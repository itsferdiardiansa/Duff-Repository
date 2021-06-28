import { mount } from '@vue/test-utils';
import Pagination from '@common/Pagination';

describe('common/Pagination', () => {
  it('will render and match snapshot', () => {
    const props = {
      current_page: 1,
      last_page: 2,
      per_page: 10,
    };

    const Component = mount(<Pagination {...props} />);

    expect(Component.element).toMatchSnapshot();
  });

  it('will not render if it does not have a total_page value', () => {
    const props = {
      current_page: 1,
      last_page: 0,
      per_page: 10,
    };

    const Component = mount(<Pagination {...props} />);

    expect(Component.element).toMatchSnapshot();
  });

  it('does not render the prev navigation when it is on the first page', async () => {
    const props = {
      current_page: 1,
      last_page: 10,
      per_page: 10,
    };

    const Component = mount(<Pagination {...props} />);

    expect(Component.find('.nav-btn.prev').exists()).toBeFalsy();
    expect(Component.element).toMatchSnapshot();
  });

  it('does not render the next navigation when it is on the last page', async () => {
    const props = {
      current_page: 10,
      last_page: 10,
      per_page: 10,
    };

    const Component = mount(<Pagination {...props} />);

    expect(Component.find('.nav-btn.next').exists()).toBeFalsy();
    expect(Component.element).toMatchSnapshot();
  });
});
