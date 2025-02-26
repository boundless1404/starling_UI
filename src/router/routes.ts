import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('src/layouts/LandingPageLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },
  {
    path: '/services',
    name: 'services',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      { path: '', component: () => import('pages/ServicesPage.vue') },
      {
        path: ':serviceId/suites',
        component: () => import('pages/SuitesPage.vue'),
      },
      {
        name: 'suites-details',
        path: ':serviceId/suites/:serviceProviderId',
        component: () => import('pages/SuitebookingPage.vue'),
      },
    ],
    props: true,
  },
  {
    path: '/payment',
    name: 'payment',
    component: () => import('layouts/AuthLayout.vue'),
    children: [{ path: '', component: () => import('pages/PaymentPage.vue') }],
  },
  {
    path: '/bookings',
    name: 'bookings',
    component: () => import('layouts/LandingPageLayout.vue'),
    children: [{ path: '', component: () => import('pages/ViewbookingsPage.vue') }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
