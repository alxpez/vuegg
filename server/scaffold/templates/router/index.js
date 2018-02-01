import Vue from 'vue'
import Router from 'vue-router'
{{PAGES_IMPORTS}}

Vue.use(Router)

export default new Router({
  routes: [{{ROUTES_DECLARATIONS}}
  ]
})
