import Vue from 'vue'
import VueSVGIcon from 'vue-svgicon'
import VueMDCAdapter from 'vue-mdc-adapter'
import Tooltip from 'vue-directive-tooltip'

import localforage from 'localforage'

import App from './App'
import router from './router/'
import store from './store/'

import './theme.scss'

import 'normalize.css'
import 'dialog-polyfill/dialog-polyfill.css'
import 'vue-directive-tooltip/css/index.css'

localforage.config({ name: 'vuegg' })

Vue.use(VueSVGIcon)
Vue.use(VueMDCAdapter)
Vue.use(Tooltip, {
  class: 'tooltip-vuegg',
  placement: 'bottom',
  delay: 50
})

Vue.config.productionTip = false

/* eslint-disable no-new */
const vm = new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})

export default vm
