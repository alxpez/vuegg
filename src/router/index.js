import Vue from 'vue'
import Router from 'vue-router'
import Page from '@/components/Page'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Page
    }
  ]
})
