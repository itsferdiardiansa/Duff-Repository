import { mount } from '@vue/test-utils';
import Pagination from '@common/Pagination';

describe('common/Pagination', () => {
  it('will render and match snapshot', () => {
    const props = {
      current_page: 1,
      total_page: 2,
      per_page: 10,
    };

    const Component = mount(<Pagination {...props} />);

    expect(Component.element).toMatchSnapshot();
  });

  it('will not render if it does not have a total_page value', () => {
    const props = {
      current_page: 1,
      total_page: 0,
      per_page: 10,
    };

    const Component = mount(<Pagination {...props} />);

    expect(Component.element).toMatchSnapshot();
  });

  it('it does not render the prev navigation when it is on the first page', async () => {
    const props = {
      current_page: 1,
      total_page: 10,
      per_page: 10,
    };

    const Component = mount(<Pagination {...props} />);

    expect(Component.find('.nav-btn.prev').exists()).toBeFalsy();
    expect(Component.element).toMatchSnapshot();
  });

  it('it does not render the next navigation when it is on the last page', async () => {
    const props = {
      current_page: 10,
      total_page: 10,
      per_page: 10,
    };

    const Component = mount(<Pagination {...props} />);

    expect(Component.find('.nav-btn.next').exists()).toBeFalsy();
    expect(Component.element).toMatchSnapshot();
  });

  it('will return the value when triggered by a click', async () => {
    const handleChange = jest.fn();
    const props = {
      current_page: 3,
      total_page: 10,
      per_page: 10,
    };

    const Component = mount(
      <Pagination {...props} onChangePage={handleChange} />
    );
    const pages = Component.findAll('.page-number');
    const prevBtn = Component.find('.nav-btn.prev');
    const nextBtn = Component.find('.nav-btn.next');

    // Click at page 2
    await pages[1].trigger('click');
    expect(handleChange).toHaveBeenCalledWith({ page: 2, limit: 10 });
    await Component.setProps({ current_page: 2 });

    // Click at page 5
    await prevBtn.trigger('click');
    expect(handleChange).toHaveBeenCalledWith({ page: 1, limit: 10 });
    await Component.setProps({ current_page: 1 });

    // Click at page 5
    await nextBtn.trigger('click');
    expect(handleChange).toHaveBeenCalledWith({ page: 1, limit: 10 });
  });
});
