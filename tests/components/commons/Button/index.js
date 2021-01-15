import { mount } from '@vue/test-utils'
import Button from '@common/Button'

describe('Button component', () => {
  let Component 

  beforeEach(async () => { 
    Component = mount(Button, {
      propsData: {
        onClick: jest.fn()
      }
    })

    await Component.setProps({
      label: '',
      variant: '',
      size: '',
      onClick: jest.fn(),
      textBold: false,
      disabled: false
    }) 
  })

  it('will render button correctly', () => {
    expect(Component.wrapper).toMatchSnapshot()
  })

  it('will have a content', async () => {
    await Component.setProps({ label: 'Your text here ...' })

    expect(Component.text()).toContain('Your text here ...')
  })

  it('will have a disabled button', async () => {
    await Component.setProps({ disabled: true })
    
    expect(Component.element.disabled).toBeTruthy()
  })

  it('will have a bold text', async () => {
    await Component.setProps({ textBold: true })

    expect(Component.attributes().class).toEqual('bold')
  })

  it('will not be rounded', async () => {
    await Component.setProps({ rounded: false })

    expect(Component.attributes().class).toEqual('no-rounded')
  })

  it('will have a size correctly', async () => {
    let sizes = ['sm', 'base', 'lg']

    for(let size of sizes) {
      await Component.setProps({ size })

      expect(Component.attributes().class).toContain(size)
    }
  })

  it('will have a background color correctly', async () => {
    let variants = ['primary', 'danger', 'warning', 'dark', 'success']

    for(let variant of variants) {
      await Component.setProps({ variant })

      expect(Component.attributes().class).toEqual(variant)
    }
  })

  it('will clicked twice', async () => {
    for(let i of [1,2]) {
      await Component.vm.onClick()
    }

    expect(Component.vm.onClick).toHaveBeenCalledTimes(2)
  })
})