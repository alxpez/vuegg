<script>
import { mapState, mapMutations } from 'vuex'
import { _clearSelectedElements, _addSelectedElement } from '@/store/types'

import MrEl from '@/components/common/mr-vue/MrEl'
import StageEl from './StageEl'

export default {
  name: 'stage-el',
  props: ['elem', 'isPlain'],
  components: { MrEl },
  render: function (createElement) {
    let elementO = (this.elem.global) ? {...this.elem, ...this.componentRef, id: this.elem.id} : this.elem

    let styles = elementO.styles
    if (this.isPlain && elementO.egglement) {
      styles = {
        ...elementO.styles,
        position: 'absolute',
        left: elementO.left + 'px',
        top: elementO.top + 'px',
        width: (typeof elementO.width === 'string') ? elementO.width : (elementO.width + 'px'),
        height: (typeof elementO.height === 'string') ? elementO.height : (elementO.height + 'px')
      }
    }

    const data = {
      'class': elementO.classes,
      'style': styles,
      'attrs': {
        id: elementO.id,
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
        children.push(createElement(StageEl, {
          'props': {
            elem: child,
            isPlain: elementO.componegg || this.isPlain
          }
        }))
      }
    }

    let stageElem
    if (this.isPlain) {
      stageElem = createElement(elementO.type, data, children)
    } else {
      let mrElProps = {
        active: this.isActive,
        left: elementO.left,
        top: elementO.top,
        width: elementO.width,
        height: elementO.height,
        minWidth: elementO.minWidth,
        minHeight: elementO.minHeight
      }

      stageElem = createElement(MrEl, {
        'props': (elementO.global) ? {...mrElProps, handles: null} : mrElProps,
        'on': { activated: this.activatedHandler }
      }, [ createElement(elementO.type, data, children) ])
    }

    return stageElem
  },
  computed: {
    isActive () {
      return (this.selectedElements.findIndex(el => el.id === this.elem.id) !== -1)
    },

    componentRef () {
      return this.projectComponents[this.projectComponents.findIndex(comp => comp.name === this.elem.name)]
    },

    ...mapState({
      selectedElements: state => state.app.selectedElements,
      projectComponents: state => state.project.components
    })
  },
  methods: {
    activatedHandler (e) {
      e.stopPropagation()
      e.preventDefault()

      if (e.shiftKey && !this.isActive) {
        this._addSelectedElement(this.elem)
      } else if (!e.shiftKey && !this.isActive) {
        this._clearSelectedElements()
        this._addSelectedElement(this.elem)
      }
    },

    ...mapMutations([_clearSelectedElements, _addSelectedElement])
  }
}
</script>
