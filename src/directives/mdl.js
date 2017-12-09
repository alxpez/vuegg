/**
 * Vue Directive to apply MDL js functionality over vue components
 *
 * @type {Vue.directive}
 * @see {@link https://vuejs.org/v2/guide/custom-directive.html|Vue Directives}
 */
const mdl = {
  install (Vue) {
    Vue.directive('mdl', {
      bind: function (el) {
        console.log('yoooo')
        window.componentHandler.upgradeElement(el)
      }
    })
  }
}

export default mdl
