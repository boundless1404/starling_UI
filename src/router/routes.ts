import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/UnauthLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('layouts/UnauthLayout.vue'),
    children: [{ path: '', component: () => import('pages/SignupPage.vue') }],
  },
  {
    path: '/services',
    name: 'services',
    component: () => import('layouts/AuthLayout.vue'),
    children: [{ path: '', component: () => import('pages/ServicesPage.vue') }],
  },
  {
    path: '/suites',
    name: 'suites',
    component: () => import('layouts/AuthLayout.vue'),
    children: [{ path: '', component: () => import('pages/SuitesPage.vue') }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
