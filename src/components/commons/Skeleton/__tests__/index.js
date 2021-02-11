import { mount } from '@vue/test-utils'
import { Rect } from '@common/Skeleton'

describe('common/Skeleton', () => {
  let Component
  let prefixClass

  beforeAll(() => {
    Component = mount(Rect)
    prefixClass = `${Component.rootVM.prefixClass}-skeleton--rect`
  })

  it('will renders ans math snapshot', () => {
    expect(Component.element).toMatchSnapshot()
  })

  it('will render with specific width', async () => {
    const width = '200px'

    await Component.setProps({ width })

    expect(Component.attributes('style')).toContain(width)
    expect(Component.element).toMatchSnapshot()
  })

  it('will render with specific height', async () => {
    const height = '2rem'

    await Component.setProps({ height })

    expect(Component.attributes('style')).toContain(height)
    expect(Component.element).toMatchSnapshot()
  })

  it('will render without being rounded', async () => {
    await Component.setProps({ rounded: false })

    expect(Component.attributes('style')).toContain('border-radius: 0;')
    expect(Component.element).toMatchSnapshot()
  })
})
