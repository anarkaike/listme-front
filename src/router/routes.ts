const routes = [
  {
    path: '/',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      { path: '', name: 'loginDefault', component: () => import('pages/LoginPage.vue') },
      { path: 'login', name: 'login', component: () => import('pages/LoginPage.vue') },
      { path: 'register', name: 'register', component: () => import('pages/RegisterPage.vue') },
      // { path: 'email-confirmation', name: 'email-confirmation', component: () => import('pages/EmailConfirmation.vue') },
      // { path: 'forgot-password', name: 'forgot-password', component: () => import('pages/ForgotPassword.vue') },
      { path: 'reset-password', name: 'reset-password', component: () => import('pages/ResetPassword.vue') }
      // { path: 'product-public/:id', name: 'product-public', component: () => import('pages/product/Public.vue') }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'home', name: 'home', component: () => import('pages/HomePage.vue') },
      { path: 'users', name: 'users', component: () => import('pages/UsersPage.vue') },
      { path: 'promoters', name: 'promoters', component: () => import('pages/PromotersPage.vue') },
      { path: 'receptionists', name: 'receptionists', component: () => import('pages/ReceptionistsPage.vue') },
      { path: 'events', name: 'events', component: () => import('pages/EventPage.vue') },
      { path: 'events-lists', name: 'events-lists', component: () => import('pages/EventListPage.vue') },
      { path: 'events-lists-items', name: 'events-lists-items', component: () => import('pages/EventListItemPage.vue') }
      // { path: 'form-config/:id?', name: 'form-config', component: () => import('pages/config/Form.vue') }
      // { path: '', component: () => import('pages/Index.vue') }
    ],
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/admin',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'admin', component: () => import('pages/AdminPage.vue') }
      // { path: 'category', name: 'category', component: () => import('pages/category/List.vue') },
      // { path: 'form-category/:id?', name: 'form-category', component: () => import('pages/category/Form.vue') },
      // { path: 'product', name: 'product', component: () => import('pages/product/List.vue') },
      // { path: 'form-product/:id?', name: 'form-product', component: () => import('pages/product/Form.vue') },
      // { path: 'form-config/:id?', name: 'form-config', component: () => import('pages/config/Form.vue') }
      // { path: '', component: () => import('pages/Index.vue') }
    ],
    meta: {
      requiresAuth: true
    }
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
