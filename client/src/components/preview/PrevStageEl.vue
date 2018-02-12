<script>
import { mapState } from 'vuex'
import PrevStageEl from './PrevStageEl'

export default {
  name: 'prev-stage-el',
  props: ['elem'],
  render: function (createElement) {
    let elementO = (this.elem.global) ? {...this.elem, ...this.componentRef, id: this.elem.id} : this.elem

    let styles = elementO.styles
    if (elementO.egglement) {
      styles = {
        ...elementO.styles,
        position: 'absolute',
        zIndex: elementO.zIndex,
        minWidth: elementO.minWidth,
        minHeight: elementO.minHeight,
        top: (typeof elementO.top === 'number') ? (elementO.top + 'px') : elementO.top,
        left: (typeof elementO.left === 'number') ? (elementO.left + 'px') : elementO.left,
        bottom: (typeof elementO.bottom === 'number') ? (elementO.bottom + 'px') : elementO.bottom,
        right: (typeof elementO.right === 'number') ? (elementO.right + 'px') : elementO.right,
        width: (typeof elementO.width === 'number') ? (elementO.width + 'px') : elementO.width,
        height: (typeof elementO.height === 'number') ? (elementO.height + 'px') : elementO.height
      }
    }

    /*
    * Tweak to apply the capability of defining the element dimension using
    * left/right (instead of width) for elements other than <div> or <span>**
    *
    * Depending on the browser this is not necessary but it will apply to be safe
    *
    * **(any other text element will take the dimensions properly, but only span is being used in vuegg)
    */
    if (elementO.type !== 'div' || elementO.type !== 'span') {
      if (isNaN(elementO.width) &&
          (typeof elementO.right !== 'undefined' && elementO.right !== null && elementO.right !== 'auto') &&
          (typeof elementO.left !== 'undefined' && elementO.left !== null && elementO.left !== 'auto')) {
        const hHigh = Math.max(parseInt(elementO.left), parseInt(elementO.right))
        let left = isNaN(elementO.left) ? elementO.left : (elementO.left + 'px')
        let right = isNaN(elementO.right) ? elementO.right : (elementO.right + 'px')
        styles = {...styles, width: 'calc(100% - ' + left + ' - ' + right + ')'}
        styles = (hHigh === parseInt(elementO.left))
          ? {...styles, left, right: 'auto'}
          : {...styles, right, left: 'auto'}
      }
    }

    /*
    * Tweak to apply the capability of defining the element dimension using
    * top/bottom (instead of height), for <img> elements (there may be others)
    *
    * Depending on the browser this is not necessary but it will apply to be safe
    */
    if (elementO.type === 'img') {
      if (isNaN(elementO.height) &&
          (typeof elementO.top !== 'undefined' && elementO.top !== null && elementO.top !== 'auto') &&
          (typeof elementO.bottom !== 'undefined' && elementO.bottom !== null && elementO.bottom !== 'auto')) {
        const vHigh = Math.max(parseInt(elementO.top), parseInt(elementO.bottom))
        let top = isNaN(elementO.top) ? elementO.top : (elementO.top + 'px')
        let bottom = isNaN(elementO.bottom) ? elementO.bottom : (elementO.bottom + 'px')
        styles = {...styles, height: 'calc(100% - ' + top + ' - ' + bottom + ')'}
        styles = (vHigh === parseInt(elementO.top))
          ? {...styles, top, bottom: 'auto'}
          : {...styles, bottom, top: 'auto'}
      }
    }

    const data = {
      'class': elementO.classes,
      'style': styles,
      'attrs': {
        id: elementO.id,
        global: elementO.global,
        egglement: elementO.egglement,
        containegg: elementO.containegg,
        componegg: elementO.componegg,
        ...elementO.attrs
      }
    }

    let children = []
    if (elementO.text) {
      children.push(elementO.text)
    } else if (elementO.children) {
      for (let child of elementO.children) {
        children.push(createElement(PrevStageEl, { 'props': { elem: child } }))
      }
    }

    return createElement(elementO.type, data, children)
  },
  computed: {
    componentRef () {
      return this.projectComponents[this.projectComponents.findIndex(comp => comp.name === this.elem.name)]
    },

    ...mapState({
      projectComponents: state => state.project.components
    })
  }
}
</script>
