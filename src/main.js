// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueDraggableResizable from 'vue-draggable-resizable'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'
import App from './App'
import router from '@/router/'
import store from '@/store/'

Vue.use(Vuetify)
Vue.use(VueMaterial)
Vue.config.productionTip = false
Vue.component('vue-draggable-resizable', VueDraggableResizable)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
