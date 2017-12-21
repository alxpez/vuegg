<script>
import { mapState, mapMutations } from 'vuex'
import { _clearSelectedElements, _addSelectedElement } from '@/store/types'

import MrEl from '@/components/mr-vue/MrEl'
import StageEl from './StageEl'

export default {
  name: 'stage-el',
  props: ['elem', 'isPlain'],
  components: { MrEl },
  render: function (createElement) {
    let stageElem

    const plainEggStyle = {
      position: 'absolute',
      left: this.elem.left + 'px',
      top: this.elem.top + 'px',
      width: (this.elem.width === '100%') ? this.elem.width : (this.elem.width + 'px'),
      height: (this.elem.height === '100%') ? this.elem.height : (this.elem.height + 'px')
    }

    const data = {
      'class': this.elem.classes,
      'style': (this.isPlain && this.elem.egglement) ? {...plainEggStyle, ...this.elem.styles} : this.elem.styles,
      'attrs': {
        id: this.elem.id,
        egglement: this.elem.egglement,
        containegg: this.elem.containegg,
        componegg: this.elem.componegg,
        ...this.elem.attrs
      }
    }

    let children = []
    if (this.elem.text) {
      children.push(this.elem.text)
    } else {
      for (let child of this.elem.children) {
        children.push(createElement(StageEl, {
          'props': {
            elem: child,
            isPlain: this.elem.componegg || this.isPlain
          }
        }))
      }
    }

    if (this.isPlain) {
      stageElem = createElement(this.elem.type, data, children)
    } else {
      stageElem = createElement(MrEl, {
        'props': {
          active: this.isActive,
          left: this.elem.left,
          top: this.elem.top,
          width: this.elem.width,
          height: this.elem.height,
          minWidth: this.elem.minWidth,
          minHeight: this.elem.minHeight
        },
        'on': {
          activated: this.activatedHandler
        }
      }, [ createElement(this.elem.type, data, children) ])
    }

    return stageElem
  },
  computed: {
    isActive () {
      return (this.selectedElements.findIndex(el => el.id === this.elem.id) !== -1)
    },

    ...mapState({
      selectedElements: state => state.app.selectedElements
    })
  },
  methods: {
    activatedHandler (e) {
      e.stopPropagation()
      e.preventDefault()

      if (e.shiftKey && !this.isActive) {
        this._addSelectedElement(this.elem)
      } else if (!e.shiftKey) {
        this._clearSelectedElements()
        this._addSelectedElement(this.elem)
      }
    },

    ...mapMutations([_clearSelectedElements, _addSelectedElement])
  }
}
</script>
