import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/screens/Main'
import Edit from '@/screens/Edit'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    }, {
      path: '/edit',
      name: 'Edit',
      component: Edit
    }
  ]
})
