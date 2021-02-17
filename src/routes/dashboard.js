/* eslint-disable no-unused-vars */

/**
 * A dashboard routes
 */
const routes = [
  {
    path: '/hero',
    name: 'Hero',
    component: () => import(/* webpackChunkName: 'page.hero' */ '@page/Hero'),
    children: [
      {
        path: 'create',
        name: 'Create Hero',
        component: () =>
          import(/* webpackChunkName: 'page.hero.form' */ '@page/Hero/Form'),
      },
    ],
  },
  {
    path: '/thematic-page',
    name: 'Thematic Page',
    component: () =>
      import(/* webpackChunkName: 'page.thematic-page' */ '@page/ThematicPage'),
    children: [
      {
        path: 'create',
        name: 'Create Thematic Page',
        component: () =>
          import(
            /* webpackChunkName: 'page.thematic-page.form' */ '@page/ThematicPage/Create'
          ),
      },
      {
        path: 'update',
        name: 'Update Thematic Page',
        component: () =>
          import(
            /* webpackChunkName: 'page.thematic-page.form' */ '@page/ThematicPage/Create'
          ),
      },
    ],
  },
  {
    path: '/partner',
    name: 'Partner',
    component: () =>
      import(/* webpackChunkName: 'page.partner' */ '@page/Partner'),
    children: [
      {
        path: 'create',
        name: 'Create Partner',
        component: () =>
          import(
            /* webpackChunkName: 'page.partner.form' */ '@page/Partner/Create'
          ),
      },
      {
        path: 'update',
        name: 'Update Partner',
        component: () =>
          import(
            /* webpackChunkName: 'page.partner.form' */ '@page/Partner/Update'
          ),
      },
    ],
  },
  {
    path: '/footer',
    name: 'Footer',
    component: () =>
      import(/* webpackChunkName: 'page.partner' */ '@page/Footer'),
    children: [
      {
        path: 'create',
        name: 'Create Footer',
        component: () =>
          import(
            /* webpackChunkName: 'page.partner.form' */ '@page/Footer/FooterForm'
          ),
      },
      {
        path: 'update',
        name: 'Update Footer',
        component: () =>
          import(
            /* webpackChunkName: 'page.partner.form' */ '@page/Footer/FooterForm'
          ),
      },
      {
        path: 'list',
        name: 'Footer Detail List',
        component: () =>
          import(
            /* webpackChunkName: 'page.partner.form' */ '@page/Footer/MenuList'
          ),
        children: [
          {
            path: 'create',
            name: 'Create Footer Detail',
            component: () =>
              import(
                /* webpackChunkName: 'page.partner.form' */ '@page/Footer/FormDetail'
              ),
          },
          {
            path: 'update',
            name: 'Update Footer Detail',
            component: () =>
              import(
                /* webpackChunkName: 'page.partner.form' */ '@page/Footer/FormDetail'
              ),
          },
        ],
      },
    ],
  },
  {
    path: '/feedback',
    name: 'Feedback',
    component: () =>
      import(/* webpackChunkName: 'page.feedback' */ '@page/Feedback'),
  },
  {
    path: '/role',
    name: 'Role',
    component: () => import(/* webpackChunkName: 'page.role' */ '@page/Role'),
    children: [
      {
        path: 'add',
        name: 'Add Role',
        component: () =>
          import(/* webpackChunkName: 'page.role.form' */ '@page/Role/Add'),
      },
      {
        path: 'update',
        name: 'Update Role',
        component: () =>
          import(/* webpackChunkName: 'page.role.form' */ '@page/Role/Add'),
      },
    ],
  },
  {
    path: '/list-admin',
    name: 'List Admin',
    component: () =>
      import(/* webpackChunkName: 'page.admin' */ '@page/ListAdmin'),
    children: [
      {
        path: 'add',
        name: 'Add Admin',
        component: () =>
          import(
            /* webpackChunkName: 'page.admin.form' */ '@page/ListAdmin/Add'
          ),
      },
    ],
  },
  {
    path: '/notification',
    name: 'Notification',
    component: () =>
      import(/* webpackChunkName: 'page.notification' */ '@page/Notification'),
    children: [
      {
        path: 'add',
        name: 'Add Notification',
        component: () =>
          import(
            /* webpackChunkName: 'page.notification.form' */ '@page/Notification/Add'
          ),
      },
      {
        path: 'update',
        name: 'Update Notification',
        component: () =>
          import(
            /* webpackChunkName: 'page.notification.form' */ '@page/Notification/Add'
          ),
      },
    ],
  },
];

export default routes;
