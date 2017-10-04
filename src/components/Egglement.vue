<template>
  <mr-egg
    :parent="true"
    :x="egg.x"
    :y="egg.y"
    :w="egg.width"
    :h="egg.height"
    :minw="egg.minWidth"
    :minh="egg.minHeight"
    @dragstop="onEgglementDropped"
    @resizestop="(x, y, width, height)=>resizeEgglement({elId:egg.id, pageId, x, y, width, height})"
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

    // TODO: Returns the first containegg found (if this is not 'family')
    containeggsOnPoint (x, y) {
      let thisEgglement = null
      let containeggs = []
      let elementsOnPoint = document.elementsFromPoint(x, y)

      for (let element of elementsOnPoint) {
        if (element.classList.contains('egglement')) {
          if (!thisEgglement) {
            thisEgglement = element
          }
          let parentId = thisEgglement.id.substring(0, thisEgglement.id.lastIndexOf('.'))
          if (!element.isEqualNode(thisEgglement)) {
            if (element.id !== parentId) {
              if (element.classList.contains('containegg')) {
                containeggs.push(element)
              }
            } else {
              return containeggs
            }
          }
        }
      }
      return containeggs
    },
    onEgglementDropped (EggLeft, EggTop, mouseX, mouseY) {
      let payload = {
        pageId: this.pageId,
        parentId: null,
        elId: this.egg.id,
        x: EggLeft,
        y: EggTop
      }

      let containeggs = this.containeggsOnPoint(mouseX, mouseY)
      console.log(containeggs)
      if (containeggs.length > 0) {
        payload.parentId = containeggs[0].id
      }

      this.moveEgglement(payload)
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

/*.containegg:hover {
  cursor: copy;
}*/
</style>
