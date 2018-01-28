import Vue from 'vue'

import localforage from 'localforage'
localforage.config({
  name: 'vuegg'
})

import App from './App'
import router from './router/'
import store from './store/'

import 'normalize.css'
import 'dialog-polyfill/dialog-polyfill.css'

import VueSVGIcon from 'vue-svgicon'
Vue.use(VueSVGIcon)

import './theme.scss'
import VueMDCAdapter from 'vue-mdc-adapter'
Vue.use(VueMDCAdapter)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
