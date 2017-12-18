<script>
import { mapState, mapMutations } from 'vuex'
import { _clearSelectedElements, _addSelectedElement, _removeSelectedElement } from '@/store/types'

import MrEl from '@/components/mr-vue/MrEl'
import StageEl from './StageEl'

export default {
  name: 'stage-el',
  props: ['elem', 'isPlain'],
  components: { MrEl },
  render: function (createElement) {
    let stageElem

    const plainElStyle = {
      position: 'absolute',
      left: this.elem.left + 'px',
      top: this.elem.top + 'px',
      width: this.elem.width + 'px',
      height: this.elem.height + 'px'
    }

    const data = {
      'class': this.elem.classes,
      'style': this.isPlain ? {...plainElStyle, ...this.elem.styles} : this.elem.styles,
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

    const plainElem = createElement(this.elem.type, data, children)

    if (this.isPlain) {
      stageElem = plainElem
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
          activated: this.activateEl
        }
      }, [plainElem])
    }

    return stageElem
  },
  data: function () {
    return {
      isActive: false,
      isDroppable: false
    }
  },
  computed: mapState({
    activePageId: state => state.app.selectedPage.id,
    selectedElements: state => state.app.selectedElements
  }),
  methods: {
    // Problems with the "selectedElements",
    // since on each mutation the element is a different one ???
    activateEl (e) {
      e.stopPropagation()
      e.preventDefault()

      if (e.shiftKey && !this.isActive) {
        console.log('shift + !active')
        this._addSelectedElement(this.elem)
      } else if (e.shiftKey && this.isActive) {
        console.log('shift + active')
        let elemIndex = this.selectedElements.findIndex(el => el.id === this.elem.id)
        console.log(elemIndex)
        // this._removeSelectedElement(elemIndex)
      } else if (!e.shiftKey) {
        console.log('!shift')
        this._clearSelectedElements()
        this._addSelectedElement(this.elem)
      }
    },

    ...mapMutations([_clearSelectedElements, _addSelectedElement, _removeSelectedElement])
  },
  watch: {
    selectedElements: function (val) {
      this.isActive = (val.findIndex(el => el.id === this.elem.id) !== -1)
    }
  }
}
</script>


<style>
html.droppable,
html.droppable * {
  cursor: copy !important;
}
</style>
