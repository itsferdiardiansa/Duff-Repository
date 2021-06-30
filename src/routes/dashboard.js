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
          import(
            /* webpackChunkName: 'page.hero.form.create' */ '@page/Hero/Create'
          ),
      },
      {
        path: 'update',
        name: 'Update Hero',
        component: () =>
          import(
            /* webpackChunkName: 'page.hero.form.update' */ '@page/Hero/Update'
          ),
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
            /* webpackChunkName: 'page.thematic-page.form.create' */ '@page/ThematicPage/Create'
          ),
      },
      {
        path: 'update',
        name: 'Update Thematic Page',
        component: () =>
          import(
            /* webpackChunkName: 'page.thematic-page.form.update' */ '@page/ThematicPage/Update'
          ),
      },
      {
        path: 'event/:thematicHashId',
        name: 'Event Thematic Page',
        component: () =>
          import(
            /* webpackChunkName: 'page.thematic-page.add.event' */ '@page/ThematicPage/AddEvent'
          ),
      },
      {
        path: 'event/:thematicHashId/add',
        name: 'Create Event Thematic Page',
        component: () =>
          import(
            /* webpackChunkName: 'page.thematic-page.add-new.event' */ '@page/ThematicPage/AddEvent/Create'
          ),
      },
      {
        path: 'event/:thematicHashId/update',
        name: 'Update Event Thematic Page',
        component: () =>
          import(
            /* webpackChunkName: 'page.thematic-page.update-new.event' */ '@page/ThematicPage/AddEvent/Update'
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
            /* webpackChunkName: 'page.partner.form.create' */ '@page/Partner/Create'
          ),
      },
      {
        path: 'update',
        name: 'Update Partner',
        component: () =>
          import(
            /* webpackChunkName: 'page.partner.form.update' */ '@page/Partner/Update'
          ),
      },
    ],
  },
  {
    path: '/pivot-bank',
    name: 'PivotBank',
    component: () =>
      import(/* webpackChunkName: 'page.pivot-bank' */ '@page/PivotBank'),
    children: [
      {
        path: 'add',
        name: 'Create PivotBank',
        component: () =>
          import(
            /* webpackChunkName: 'page.pivot-bank.form.create' */ '@page/PivotBank/Create'
          ),
      },
      {
        path: 'update',
        name: 'Update PivotBank',
        component: () =>
          import(
            /* webpackChunkName: 'page.pivot-bank.form.update' */ '@page/PivotBank/Update'
          ),
      },
    ],
  },
  {
    path: '/footer',
    name: 'Footer',
    component: () =>
      import(/* webpackChunkName: 'page.footer' */ '@page/Footer'),
    children: [
      {
        path: 'create',
        name: 'Create Footer',
        component: () =>
          import(
            /* webpackChunkName: 'page.footer.form.create' */ '@page/Footer/Create'
          ),
      },
      {
        path: 'update',
        name: 'Update Footer',
        component: () =>
          import(
            /* webpackChunkName: 'page.footer.form.update' */ '@page/Footer/Update'
          ),
      },
      {
        path: 'list',
        name: 'Footer Detail List',
        component: () =>
          import(
            /* webpackChunkName: 'page.footer.list' */ '@page/Footer/Menu'
          ),
        children: [
          {
            path: 'create',
            name: 'Create Footer Detail',
            component: () =>
              import(
                /* webpackChunkName: 'page.footer.list.form.create' */ '@page/Footer/CreateMenu'
              ),
          },
          {
            path: 'update',
            name: 'Update Footer Detail',
            component: () =>
              import(
                /* webpackChunkName: 'page.footer.list.form.update' */ '@page/Footer/UpdateMenu'
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
        path: 'create',
        name: 'Add Role',
        component: () =>
          import(
            /* webpackChunkName: 'page.role.form.create' */ '@page/Role/Create'
          ),
      },
      {
        path: 'update',
        name: 'Update Role',
        component: () =>
          import(
            /* webpackChunkName: 'page.role.form.update' */ '@page/Role/Update'
          ),
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
        path: 'create',
        name: 'Create Admin',
        component: () =>
          import(
            /* webpackChunkName: 'page.admin.form.create' */ '@page/ListAdmin/Create'
          ),
      },
      {
        path: 'update',
        name: 'Update Admin',
        component: () =>
          import(
            /* webpackChunkName: 'page.admin.form.update' */ '@page/ListAdmin/Update'
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
        path: 'create',
        name: 'Add Notification',
        component: () =>
          import(
            /* webpackChunkName: 'page.notification.form.create' */ '@page/Notification/Create'
          ),
      },
      {
        path: 'update',
        name: 'Update Notification',
        component: () =>
          import(
            /* webpackChunkName: 'page.notification.form.update' */ '@page/Notification/Update'
          ),
      },
    ],
  },
];

export default routes;
