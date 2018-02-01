import Vue from 'vue'
import Router from 'vue-router'
import Mainegg from '@/components/main'
import NotFound from '@/components/404'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'main',
      component: Mainegg
    }, {
      path: '/auth',
      redirect: { name: 'main' }
    }, {
      path: '*',
      component: NotFound
    }
  ]
})
