<script>
import { mapState, mapActions } from 'vuex'
import { resizeEgglement, moveEgglement } from '@/store/types'

import MrEgg from './MrEgg'
import StageEl from './StageEl'

export default {
  name: 'stage-el',
  props: ['elem', 'isPlain'],
  components: { MrEgg },
  render: function (createElement) {
    let stageElem

    let plainElStyle = {
      position: 'absolute',
      left: this.elem.x + 'px',
      top: this.elem.y + 'px',
      width: this.elem.width + 'px',
      height: this.elem.height + 'px'
    }

    let data = {
      'props': { id: this.elem.id },
      'class': (this.elem.egglement && !this.isPlain) ? {...this.elem.classes, egglement: true} : this.elem.classes,
      'style': this.isPlain ? {...plainElStyle, ...this.elem.styles} : this.elem.styles,
      'attrs': this.elem.attrs
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
      stageElem = createElement(MrEgg, {
        'props': {
          parent: true,
          x: this.elem.x,
          y: this.elem.y,
          w: this.elem.width,
          h: this.elem.height
        },
        'on': {
          dragging: this.onDragging,
          dragstop: this.onDragStop,
          resizestop: this.onResizeStop
        }
      }, [plainElem])
    }

    return stageElem
  },
  data: function () {
    return {
      isDroppable: false
    }
  },
  computed: mapState({
    activePageId: state => state.app.selectedPage.id
  }),
  methods: {
    getContaineggOnPoint (x, y) {
      let thisEgg = this.$el.children[0]
      console.log(thisEgg)
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
    onResizeStop (x, y, width, height) {
      const payload = {
        elId: this.elem.id,
        pageId: this.activePageId,
        left: x,
        top: y,
        width,
        height
      }
      this.resizeEgglement(payload)
    },
    ...mapActions([resizeEgglement, moveEgglement])
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
