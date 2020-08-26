import store from '../store/index'

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/Index/Index.vue'),
        beforeEnter: (to, from, next) => {
          if (store().getters.getProfileHash) {
            next('/login')
          }
          next()
        }
      },
      { path: 'users/:hash', props: true, component: () => import('pages/User/Index.vue') },
      { path: 'pomodoro/:hash', props: true, component: () => import('pages/Pomodoro/Index.vue') },
      { path: 'login', component: () => import('pages/Login/Index.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
