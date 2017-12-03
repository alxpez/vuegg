import Vue from 'vue'

import 'material-design-lite/material.min'
import 'material-design-lite/material.min.css'

import App from './App'
import router from './router/'
import store from './store/'

Vue.config.productionTip = false

Vue.directive('mdl', {
  bind: function (el, binding, vnode) {
    console.log(el)
    window.componentHandler.upgradeElement(el)
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
