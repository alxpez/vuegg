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
    @resizestop="(x, y, width, height)=>resizeEgglement({elId:egg.id, pageId, left: x, top: y, width, height})"
  >
    <component
      :id="egg.id"
      :class="[egg.classes, {egglement: egg.egg}]"
      :style="egg.styles"
      v-bind="egg.props"
      :is="egg.type"
    >
      {{ egg.text }}
      <component v-if="hasChildren"
        v-for="child in egg.children"
        :key="child.id"
        :id="child.id"
        v-bind="childProps(child)"
        :is="childType(child)"
      >
        {{ child.text }}
      </component>
    </component>
  </mr-egg>
</template>


<script>
import { mapActions } from 'vuex'
import { resizeEgglement, moveEgglement } from '@/store/types'
import MrEgg from '@/components/MrEgg'

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
    pageId () {
      return this.$route.query.page
    },
    hasChildren () {
      return (this.egg.children && this.egg.children.length > 0)
    }
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
      let containegg = this.getContaineggOnPoint(mouseX, mouseY)
      this.toggleDroppableCursor(containegg && typeof containegg !== 'undefined')
    },
    onDragStop (eggLeft, eggTop, mouseX, mouseY) {
      let payload = {
        pageId: this.pageId,
        parentId: null,
        elId: this.egg.id,
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
