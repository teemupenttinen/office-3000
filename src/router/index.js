import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Login from '@/components/Login'
import Settings from '@/components/Settings'
import store from '../store/index.js'

Vue.use(Router)

function requireAuth(to, from, next){
  if (store.getters.getUser == null) {
    next('/Login');
  } else {
    next();
  }
}

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main,
      beforeEnter: requireAuth
    },
    {
      path: '/Settings',
      name: 'Settings',
      component: Settings,
      beforeEnter: requireAuth
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    }
  ]
})
