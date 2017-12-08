import Vue from 'vue'

import App from './App'
import router from './router/'
import store from './store/'

import redoundo from './mixins/redoundo'

import VueMDCAdapter from 'vue-mdc-adapter'
import 'vue-mdc-adapter/dist/vue-mdc-adapter.css'

// Get rid of these ones (if you can)
import mdl from './directives/mdl'
import 'material-design-lite/material.min'
import 'material-design-lite/material.min.css'

import 'dialog-polyfill/dialog-polyfill.css'
// Get rid of these ones

Vue.use(redoundo)
Vue.use(VueMDCAdapter)
Vue.use(mdl)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
