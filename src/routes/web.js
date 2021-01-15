import NotFound from '@page/Error/404'

/**
 * A dashboard routes
 */
const routes = [
  {
    path: '/event-live-streaming',
    name: 'Event Live Streaming',
    component: () => import('@page/EventLiveStreaming'),
  },
  {
    path: '/thematic-page',
    name: 'Thematic Page',
    component: () => import('@page/ThematicPage'),
  },
  {
    name: 'Page Not Found',
    component: () => import('@layout/BlankLayout'),
    children: [
      {
        path: '/:pathMatch(.*)*',
        name: 'Error Page',
        component: NotFound,
      },
    ],
  },
]

export default routes
