import Vue from 'vue'
import VueMDCAdapter from 'vue-mdc-adapter'
import 'vue-mdc-adapter/dist/vue-mdc-adapter.css'

// Get rid of these ones (if you can)
import 'material-design-lite/material.min'
import 'material-design-lite/material.min.css'

import 'dialog-polyfill/dialog-polyfill.css'
// Get rid of these ones

import App from './App'
import router from './router/'
import store from './store/'

Vue.use(VueMDCAdapter)

Vue.directive('mdl', {
  bind: function (el, binding, vnode) {
    window.componentHandler.upgradeElement(el)
  }
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
