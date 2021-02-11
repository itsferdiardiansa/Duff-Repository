import { shallowMount } from '@vue/test-utils'
import Button from '@common/Button'

describe('common/Button', () => {
  let Component
  let prefixClass
  let handleClick = jest.fn()

  beforeAll(() => {
    Component = shallowMount(Button)
    prefixClass = `${Component.rootVM.prefixClass}-button`
  })

  it('will render and match snapshot', () => {
    expect(Component.element).toMatchSnapshot()
  })

  it('will have a label correctly', async () => {
    const label = 'This is common button'

    await Component.setProps({ label })

    expect(Component.find(`.${prefixClass}--label`).text()).toMatch(label)

    expect(Component.element).toMatchSnapshot()
  })

  it('will have a variant color correctly', async () => {
    let variants = ['primary', 'danger', 'warning', 'dark', 'success']

    for (let variant of variants) {
      await Component.setProps({ variant })

      expect(Component.attributes().class).toContain(`${prefixClass}--${variant}`)
      
      expect(Component.element).toMatchSnapshot()
    }
  })

  it('will have a inverse variant color correctly', async () => {
    let variants = ['primary', 'danger']

    for (let variant of variants) {
      await Component.setProps({ variant, inverse: true })

      expect(Component.attributes().class).toContain(`${prefixClass}--${variant}-inverse`)
      
      expect(Component.element).toMatchSnapshot()
    }
  })

  it('will have a size correctly', async () => {
    let sizes = ['xs', 'sm', 'base', 'lg', 'xl']

    for (let size of sizes) {
      await Component.setProps({ size })

      expect(Component.attributes().class).toContain(`${prefixClass}--${size}`)
      
      expect(Component.element).toMatchSnapshot()
    }
  })

  it('will have a icon correctly', async () => {
    let icon = ['fa', 'trash']

    await Component.setProps({ icon })

    expect(Component.vm.iconEl.icon).toMatchObject(icon)
      
    expect(Component.element).toMatchSnapshot()
  })

  it('will have a disabled attribute correctly', async () => {
    await Component.setProps({ disabled: true })

    expect(Component.attributes()).toHaveProperty('disabled')
      
    expect(Component.element).toMatchSnapshot()
  })

  it('will not a rounded correctly', async () => {
    await Component.setProps({ rounded: false })

    expect(Component.attributes().class).toContain('no-rounded')
      
    expect(Component.element).toMatchSnapshot()
  })

  it('will have a pill correctly', async () => {
    await Component.setProps({ pill: true })

    expect(Component.attributes().class).toContain('pill')
      
    expect(Component.element).toMatchSnapshot()
  })

  it('will have a text bold correctly', async () => {
    await Component.setProps({ bold: true })

    expect(Component.attributes().class).toContain('text-bold')
      
    expect(Component.element).toMatchSnapshot()
  })

  it('will trigger click event correctly', async () => {
    await Component.vm.$emit('click', handleClick)
  
    expect(Component.emitted('click').length).toEqual(1)

    expect(Component.element).toMatchSnapshot()
  })
})