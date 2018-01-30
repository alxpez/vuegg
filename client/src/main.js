import Vue from 'vue'
import VueMDCAdapter from 'vue-mdc-adapter'
import VueSVGIcon from 'vue-svgicon'

import localforage from 'localforage'

import App from './App'
import router from './router/'
import store from './store/'

import 'normalize.css'
import 'dialog-polyfill/dialog-polyfill.css'
import './theme.scss'

localforage.config({ name: 'vuegg' })

Vue.use(VueSVGIcon)
Vue.use(VueMDCAdapter)
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
