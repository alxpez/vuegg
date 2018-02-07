import Vue from 'vue'
import Router from 'vue-router'
import Editor from '@/views/Editor'
import Preview from '@/views/Preview'
import NotFound from '@/views/404'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'editor',
      component: Editor
    }, {
      path: '/preview',
      name: 'preview',
      component: Preview
    }, {
      path: '/auth',
      redirect: { name: 'main' }
    }, {
      path: '*',
      component: NotFound
    }
  ]
})
