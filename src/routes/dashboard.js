import NotFound from '@page/Error/404'
import menuLists from '@mock/menu.json'

function buildComponentDirectory(arr) {
  return arr.join('/')
}

function buildRoute() {
  let args = [].concat(...Array.prototype.slice.call(arguments)) || {}
  let formatComponentName = name => {
    return name.replace(/[^A-Z]/gi, '')
  }

  let result

  this.filter(item => item.link).forEach(item => {
    let children = []

    /* eslint-disable no-unused-vars */
    // let groups = []
    let componentName = [formatComponentName(item.name)]

    if (Object.hasOwnProperty.call(item, 'children')) {
      children = buildRoute.call(item.children, { parent: componentName })
    }

    if (Object.hasOwnProperty.call(...args, 'parent')) {
      let data = { ...args }

      componentName.push(data[0].parent[0])
    }

    let _c = buildComponentDirectory(componentName.reverse())

    result = {
      path: item.link,
      name: item.name,
      component: () => import(`@page/${_c}`),
      children,
    }
  })

  return result
}

let adminRoutes = menuLists.map(item => {
  return buildRoute.call(item.lists)
})

/**
 * A dashboard routes
 */
const routes = [
  {
    path: '/hero',
    name: 'Hero',
    component: () => import('@page/Hero'),
    children: [
      {
        path: 'create',
        name: 'Create Hero',
        component: () => import('@page/Hero/Create'),
      },
    ],
  },
  {
    path: '/event-live-streaming',
    name: 'Event Live Streaming',
    component: () => import('@page/EventLiveStreaming'),
  },
  {
    path: '/thematic-page',
    name: 'Thematic Page',
    component: () => import('@page/ThematicPage'),
    meta: {
      params: true,
    },
    children: [
      {
        path: 'create',
        name: 'Create Thematic Page',
        component: () => import('@page/ThematicPage/Create'),
      },
    ],
  },
  {
    path: '/url-redirection',
    name: 'URL Redirection',
    component: () => import('@page/URLRedirection'),
    children: [
      {
        path: 'create',
        name: 'Create URL Redirection',
        component: () => import('@page/URLRedirection/Create'),
      },
    ],
  },
  {
    path: '/loket-ads',
    name: 'Loket Ads',
    component: () => import('@page/LoketAds'),
    children: [
      {
        path: 'create',
        name: 'Create LoketADS',
        component: () => import('@page/LoketAds/Create'),
      },
    ],
  },
  {
    path: '/announcement',
    name: 'Announcement',
    component: () => import('@page/Announcement'),
    children: [
      {
        path: 'create',
        name: 'Create Announcement',
        component: () => import('@page/Announcement/Create'),
      },
    ],
  },
  {
    path: '/partner',
    name: 'Partner',
    component: () => import('@page/Partner'),
    children: [
      {
        path: 'create',
        name: 'Create Partner',
        component: () => import('@page/Partner/Create'),
      },
    ],
  },
  {
    path: '/verified-user',
    name: 'Verified User',
    component: () => import('@page/VerifiedUser'),
    children: [
      {
        path: 'add',
        name: 'Add Verified User',
        component: () => import('@page/VerifiedUser/Add'),
      },
    ],
  },
  {
    path: '/verified-document',
    name: 'Verified Document',
    component: () => import('@page/VerifiedDocument'),
    children: [
      {
        path: 'add',
        name: 'Add Verified User',
        component: () => import('@page/VerifiedUser/Add'),
      },
    ],
  },
  {
    path: '/event',
    name: 'Event',
    component: () => import('@page/Event'),
  },
  {
    path: '/blacklist-word',
    name: 'Blacklist Word',
    component: () => import('@page/BlacklistWord'),
    children: [
      {
        path: 'add',
        name: 'Add Word',
        component: () => import('@page/BlacklistWord/Add'),
      },
    ],
  },
  {
    path: '/blacklist-event',
    name: 'Blacklist Event',
    component: () => import('@page/BlacklistEvent'),
  },
  {
    path: '/pivot-bank',
    name: 'Pivot Bank',
    component: () => import('@page/PivotBank'),
    children: [
      {
        path: 'add',
        name: 'Add Pivot Bank',
        component: () => import('@page/PivotBank/Add'),
      },
    ],
  },
  {
    path: '/failed-withdraw',
    name: 'Failed Withdraw',
    component: () => import('@page/FailedWithdraw'),
  },
  {
    path: '/discount',
    name: 'Discount',
    component: () => import('@page/Discount'),
    children: [
      {
        path: 'add',
        name: 'Add Discount',
        component: () => import('@page/Discount/Add'),
      },
    ],
  },
  {
    path: '/feedback',
    name: 'Feedback',
    component: () => import('@page/Feedback'),
  },
  {
    path: '/role',
    name: 'Role',
    component: () => import('@page/Role'),
    children: [
      {
        path: 'add',
        name: 'Add Role',
        component: () => import('@page/Role/Add'),
      },
    ],
  },
  {
    path: '/list-admin',
    name: 'List Admin',
    component: () => import('@page/ListAdmin'),
    children: [
      {
        path: 'add',
        name: 'Add Admin',
        component: () => import('@page/ListAdmin/Add'),
      },
    ],
  },
  {
    name: 'Page Not Found',
    path: '/:pathMatch(.*)*',
    component: NotFound,
    props: {},
  },
]

export default routes
