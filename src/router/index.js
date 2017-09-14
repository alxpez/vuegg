import Vue from 'vue'
import Router from 'vue-router'
import MainContainer from '@/screens/MainContainer'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: MainContainer
    }
  ]
})
