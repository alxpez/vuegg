<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import { _clearSelectedElements, _addSelectedElement, resizeEgglement, moveEgglement } from '@/store/types'

import MrEl from '@/components/mr-vue/MrEl'
import StageEl from './StageEl'

export default {
  name: 'stage-el',
  props: ['elem', 'isPlain'],
  components: { MrEl },
  render: function (createElement) {
    let stageElem

    let plainElStyle = {
      position: 'absolute',
      left: this.elem.left + 'px',
      top: this.elem.top + 'px',
      width: this.elem.width + 'px',
      height: this.elem.height + 'px'
    }

    let data = {
      'class': (this.elem.egglement && !this.isPlain) ? {...this.elem.classes, egglement: true} : this.elem.classes,
      'style': this.isPlain ? {...plainElStyle, ...this.elem.styles} : this.elem.styles,
      'attrs': {...this.elem.attrs, id: this.elem.id}
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

    let plainElem = createElement(this.elem.type, data, children)

    if (this.isPlain) {
      stageElem = plainElem
    } else {
      // active prop: Computed / watcher to check if element is in the selectedEggs array
      stageElem = createElement(MrEl, {
        'props': {
          active: this.isActive,
          left: this.elem.left,
          top: this.elem.top,
          width: this.elem.width,
          height: this.elem.height
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
    activateEl (e) {
      if (!e.shiftKey) {
        this._clearSelectedElements()
        this._addSelectedElement(this.elem)
      } else if (!this.isActive) {
        this._addSelectedElement(this.elem)
      }
    },

    getContaineggOnPoint (x, y) {
      let thisEgg = this.$el.children[0]
      let parentId = thisEgg.id.substring(0, thisEgg.id.lastIndexOf('.'))
      let elementsOnPoint = document.elementsFromPoint(x, y)

      for (let element of elementsOnPoint) {
        if (element.id === parentId) return null

        if (element.classList.contains('eggStage') ||
          (
            !element.id.includes(thisEgg.id) &&
            element.classList.contains('egglement') &&
            element.classList.contains('containegg')
          )
        ) {
          return element
        }
      }
      return null
    },
    onDragging (eggLeft, eggTop, mouseX, mouseY) {
      let containegg = this.getContaineggOnPoint(mouseX, mouseY)
      this.toggleDroppableCursor(containegg && typeof containegg !== 'undefined')
    },
    onDragStop (eggLeft, eggTop, mouseX, mouseY) {
      let payload = {
        pageId: this.activePageId,
        parentId: null,
        elId: this.elem.id,
        left: eggLeft,
        top: eggTop,
        mouseX,
        mouseY
      }

      let containegg = this.getContaineggOnPoint(mouseX, mouseY)
      console.log(containegg)
      if (containegg && typeof containegg !== 'undefined') {
        payload.parentId = containegg.id
      }
      this.moveEgglement(payload)
      this.toggleDroppableCursor(false)
    },
    toggleDroppableCursor (isDroppable) {
      isDroppable
        ? document.documentElement.classList.add('droppable')
        : document.documentElement.classList.remove('droppable')
    },
    onResizeStop (left, top, width, height) {
      const payload = {
        elId: this.elem.id,
        pageId: this.activePageId,
        left: left,
        top: top,
        width,
        height
      }
      this.resizeEgglement(payload)
    },
    ...mapActions([resizeEgglement, moveEgglement]),
    ...mapMutations([_clearSelectedElements, _addSelectedElement])
  },
  watch: {
    selectedElements: function (val) {
      this.isActive = (val.findIndex(el => el.id === this.elem.id) !== -1)
    }
  }
}
</script>


<style scoped>
.egglement {
  margin: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  box-sizing: border-box;
}
</style>

<style>
html.droppable,
html.droppable * {
  cursor: copy !important;
}
</style>
