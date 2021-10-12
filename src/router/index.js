import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../components/Login.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/home',
    name: 'home',
    redirect: '/welcome',
    component: () => import(/* webpackChunkName: "home" */ '../components/Home.vue'),
    children: [
      {
        path: '/welcome',
        component: () => import(/* webpackChunkName: "home" */ '../components/Welcome.vue')
      },
      {
        path: '/users',
        name: 'users',
        component: () => import(/* webpackChunkName: "users" */ '../components/user/users.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name !== 'login' && !window.sessionStorage.getItem('token')) {
    next('/login')
  }
  next()
})

export default router
