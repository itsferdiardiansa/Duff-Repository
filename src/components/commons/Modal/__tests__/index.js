import { mount } from '@vue/test-utils'
import Modal from '@common/Modal'

describe('common/Modal', () => {
  let Component
  let prefixClass
  let handleOnConfirm = jest.fn()
  let handleOnCancel = jest.fn()

  beforeAll(() => {
    Component = mount(Modal, {
      slots: {
        header: 'Delete confirmation',
        body: 'Are you sure to delete this item?',
      },
    })
    prefixClass = `${Component.rootVM.prefixClass}-modal`
  })

  beforeEach(() => {
    Component = mount(Modal)
  })

  it('will rendered with snapshot', async () => {
    await self.$modal.show()

    expect(Component.element).toMatchSnapshot()
  })

  it('will rendered with passing title', async () => {
    await Component.setProps({ title: 'This is title' })

    await self.$modal.show()

    expect(Component.html()).toContain('This is title')
    expect(Component.element).toMatchSnapshot()
  })

  it('will rendered with passing a descripotio', async () => {
    await Component.setProps({ description: 'This is a description of modal' })

    await self.$modal.show()

    expect(Component.html()).toContain('This is a description of modal')
    expect(Component.element).toMatchSnapshot()
  })

  it('will disappear after the user clicks the confirmation button', async () => {
    await Component.setProps({
      title: 'Delete',
      description: 'Are you sure to delete this item?',
      onConfirmFn: handleOnConfirm,
    })

    await self.$modal.show()

    // Click to confirm
    await Component.vm.modalFooterEl.querySelector('button').click()

    // Modal will be hide from DOM
    expect(Component.vm.modalEl).toBeNull()
  })
})
