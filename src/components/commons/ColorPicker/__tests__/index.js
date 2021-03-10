import { mount } from '@vue/test-utils';
import ColorPicker from '@common/ColorPicker';

describe('common/Colorpicker', () => {
  let Component;
  let prefixClass;

  beforeAll(() => {
    Component = mount(<ColorPicker />);
  });

  it('will renders ans match snapshot', () => {
    expect(Component.element).toMatchSnapshot();
  });
});
