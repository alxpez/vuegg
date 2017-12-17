<template>
  <mr-container
    :id="page.id"
    :style="page.styles"
    :class="[page.classes, {eggStage: true}]"
    :activeElements="selectedElements"
    @moving="movingHandler"
    @movestop="moveStopHandler"
    @resizestop="resizeStopHandler"
    @clearselection="_clearSelectedElements">

    <stage-el
      v-for="element in page.children"
      :key="element.id"
      :elem="element">
    </stage-el>

  </mr-container>
</template>


<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import { _clearSelectedElements, resizeEgglement, moveEgglement } from '@/store/types'

import MrContainer from '@/components/mr-vue/MrContainer'
import StageEl from './StageEl'

export default {
  name: 'stage',
  components: { StageEl, MrContainer },
  props: ['page'],
  computed: mapState({
    selectedElements: state => state ? state.app.selectedElements : []
  }),
  methods: {
    resizeStopHandler (resStopData) {
      resStopData.map(resElData => this.resizeEgglement({...resElData, pageId: this.page.id}))
    },

    movingHandler (absMouseX, absMouseY) {
      let containegg = this.getContaineggOnPoint(absMouseX, absMouseY)
      this.toggleDroppableCursor(containegg)
    },

    moveStopHandler (moveStopData) {
      const containegg = this.getContaineggOnPoint(moveStopData.absMouseX, moveStopData.absMouseY)
      const parentId = containegg ? containegg.id : null

      moveStopData.moveElData.map(moveData => this.moveEgglement({
        pageId: this.page.id,
        mouseX: moveStopData.relMouseX,
        mouseY: moveStopData.relMouseY,
        parentId,
        ...moveData
      }))

      this.toggleDroppableCursor(false)
    },

    getContaineggOnPoint (x, y) {
      const movingEggs = this.selectedElements
      const parentsIds = movingEggs.map(egg => egg.id.substring(0, egg.id.lastIndexOf('.')))
      const commonParentId = parentsIds.every((val, i, arr) => val === arr[0]) ? parentsIds[0] : null
      const elementsOnPoint = document.elementsFromPoint(x, y)

      for (let el of elementsOnPoint) {
        if (el.id === commonParentId) return null
        if ((el.getAttribute('mr-container')) ||
          (
            (el.getAttribute('containegg')) &&
            (!el.getAttribute('componegg')) &&
            (movingEggs.every(egg => !el.id.includes(egg.id)))
          )
        ) return el
      }
      return null
    },

    toggleDroppableCursor (isDroppable) {
      isDroppable
        ? document.documentElement.classList.add('droppable')
        : document.documentElement.classList.remove('droppable')
    },

    ...mapActions([resizeEgglement, moveEgglement]),
    ...mapMutations([_clearSelectedElements])
  }
}
</script>


<style>
html.droppable,
html.droppable * {
  cursor: copy !important;
}
</style>

<style scoped>
.eggStage {
  /* for paper style */
  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.2),
    0 1px 1px rgba(0, 0, 0, 0.14),
    0 2px 1px -1px rgba(0, 0, 0, 0.12);
}
</style>
