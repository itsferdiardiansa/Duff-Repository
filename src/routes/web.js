import NotFound from '@page/Error/404'
/**
 * A dashboard routes
 */
const routes = [
  {
    path: '/event-live-streaming',
    name: 'Event Live Streaming',
    component: () => import('@page/EventLiveStreaming')
  },
  {
    path: '/thematic-page',
    name: 'Thematic Page',
    component: () => import('@page/ThematicPage')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
    props: {
      onErrorPage: true
    }
  }
]

export default routes