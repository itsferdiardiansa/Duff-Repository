import { mount } from '@vue/test-utils'
import Breadcrumb from '@common/Breadcrumb'
import Button from '@common/Button'
import { useRouter } from 'vue-router'

describe('common/Breadcrumb', () => {
  const router = useRouter()
  let Component
  let prefixClass

  beforeAll(async () => {
    Component = mount(Breadcrumb, {
      global: {
        stubs: {
          CMButton: Button,
        },
      },
    })
    prefixClass = `${Component.rootVM.prefixClass}-breadcrumb`
  })

  it('will render and match snapshot', () => {
    expect(Component.element).toMatchSnapshot()
  })

  it('will render the item according to the property data provided', async () => {
    const breadcrumbs = [
      { path: '/', name: 'Home' },
      { path: '/role', name: 'Role' },
      { path: '/role/create', name: 'Add Role' },
    ]

    await Component.setProps({ data: breadcrumbs })

    expect(Component.element).toMatchSnapshot()
  })

  it('it will trigger to click correctly', async () => {
    const breadcrumbs = [
      { path: '/', name: 'Home' },
      { path: '/partner', name: 'Partner' },
      { path: '/partner/create', name: 'Add Partner' },
    ]

    await Component.setProps({ data: breadcrumbs })

    await Component.vm.breadcrumbItemEl[1].querySelector('button').click()

    expect(router.push).toHaveBeenCalled()
    expect(router.push).toHaveBeenCalledWith('/partner')
  })
})
