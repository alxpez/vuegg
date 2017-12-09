<template>
  <mr-egg
    :parent="true"
    :x="egg.x"
    :y="egg.y"
    :w="egg.width"
    :h="egg.height"
    :minw="egg.minWidth"
    :minh="egg.minHeight"
    @dragging="onDragging"
    @dragstop="onDragStop"
    @resizestop="(x, y, width, height)=>resizeEgglement({elId:egg.id, pageId: activePageId, left: x, top: y, width, height})"
  >
    <component
      :id="egg.id"
      :is="egg.type"
      :style="egg.styles"
      :class="[egg.classes, {egglement: egg.egg}]"
      v-bind="egg.props"
    >
      {{ egg.text }}
      <component v-if="hasChildren"
        v-for="child in egg.children"
        :key="child.id"
        :id="child.id"
        :is="childType(child)"
        v-bind="childProps(child)"
      >
        {{ child.text }}
      </component>
    </component>
  </mr-egg>
</template>


<script>
import { mapState, mapActions } from 'vuex'
import { resizeEgglement, moveEgglement } from '@/store/types'
import MrEgg from './MrEgg'

export default {
  name: 'egglement',
  props: ['egg'],
  components: { MrEgg },
  data: function () {
    return {
      isDroppable: false
    }
  },
  computed: {
    hasChildren () {
      return (this.egg.children && this.egg.children.length > 0)
    },
    ...mapState({
      activePageId: state => state.app.selectedPage.id
    })
  },
  methods: {
    childType (child) {
      return child.egg ? 'egglement' : child.type
    },
    childProps (child) {
      return child.egg ? { egg: child } : [child.props, {style: child.styles}, {class: child.classes}]
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
      let absMouseX = mouseX - document.documentElement.scrollLeft
      let absMouseY = mouseY - document.documentElement.scrollTop
      let containegg = this.getContaineggOnPoint(absMouseX, absMouseY)

      this.toggleDroppableCursor(containegg && typeof containegg !== 'undefined')
    },
    onDragStop (eggLeft, eggTop, mouseX, mouseY) {
      let payload = {
        pageId: this.activePageId,
        parentId: null,
        elId: this.egg.id,
        left: eggLeft,
        top: eggTop,
        mouseX,
        mouseY
      }

      let absMouseX = mouseX - document.documentElement.scrollLeft
      let absMouseY = mouseY - document.documentElement.scrollTop
      let containegg = this.getContaineggOnPoint(absMouseX, absMouseY)

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
}
</style>

<style>
html.droppable,
html.droppable * {
  cursor: copy !important;
}
</style>
