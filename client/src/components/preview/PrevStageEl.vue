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
        top: (typeof elementO.top === 'number') ? (elementO.top + 'px') : 'auto',
        left: (typeof elementO.left === 'number') ? (elementO.left + 'px') : 'auto',
        bottom: (typeof elementO.bottom === 'number') ? (elementO.bottom + 'px') : 'auto',
        right: (typeof elementO.right === 'number') ? (elementO.right + 'px') : 'auto',
        width: (typeof elementO.width === 'number') ? (elementO.width + 'px') : elementO.width,
        height: (typeof elementO.height === 'number') ? (elementO.height + 'px') : elementO.height
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
