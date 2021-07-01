import { shallowMount } from '@vue/test-utils';
import Tooltip from '@common/Tooltip';

describe('common/Tooltip', () => {
  let wrapperComponent;

  beforeAll(() => {
    wrapperComponent = shallowMount({
      render() {
        return <div></div>;
      },
    });
  });

  it('will render and match snapshot', () => {
    const Component = shallowMount(wrapperComponent, {
      global: {
        stubs: {
          tooltip: Tooltip,
        },
      },
    });

    expect(Component.element).toMatchSnapshot();
  });
});
