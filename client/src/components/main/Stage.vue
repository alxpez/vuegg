<template>
  <mr-container
    :id="page.id"
    :style="pageStyles"
    :class="[page.classes, {stage: true}]"
    :activeElements="selectedElements"
    @moving="movingHandler"
    @movestop="moveStopHandler"
    @resizestop="resizeStopHandler"
    @selectstop="selectStopHandler"
    @clearselection="clearSelectionHandler"
    @delete="deleteHandler"
    @copy="copyHandler"
    @cut="cutHandler"
    @paste="pasteHandler"
    @drop="dropHandler"
  >

    <stage-el
      v-for="element in page.children"
      :key="element.id"
      :elem="element">
    </stage-el>

  </mr-container>
</template>


<script>
import cloneDeep from 'clone-deep'
import elementsFromPoint from '@/polyfills/elementsFromPoint'
import { getRealDimension, fixElementToParentBounds } from '@/helpers/positionDimension'

import { mapState, mapActions, mapMutations } from 'vuex'
import { _clearSelectedElements, _addSelectedElements, registerElement,
        removeElement, resizeElement, moveElement } from '@/store/types'

import MrContainer from '@/components/common/mr-vue/MrContainer'
import StageEl from './StageEl'

export default {
  name: 'stage',
  components: { StageEl, MrContainer },
  props: ['page'],
  data: function () {
    return {
      clipboard: []
    }
  },
  computed: {
    pageStyles () {
      return {
        ...this.page.styles,
        height: (typeof this.page.height === 'string') ? this.page.height : (this.page.height + 'px'),
        width: (typeof this.page.width === 'string') ? this.page.width : (this.page.width + 'px')
      }
    },

    ...mapState({
      selectedElements: state => state.app.selectedElements || [],
      projectComponents: state => state.project.components
    })
  },
  methods: {
    clearSelectionHandler () {
      if (this.selectedElements.length > 0) this._clearSelectedElements()
    },

    deleteHandler () {
      if (this.selectedElements.length > 0) {
        this.selectedElements.map(el => this.removeElement({page: this.page, elId: el.id}))
      }
    },

    copyHandler () {
      if (this.selectedElements.length > 0) {
        this.clipboard = []
        this.selectedElements.map(el => this.clipboard.push(cloneDeep(el)))
      }
    },

    cutHandler () {
      if (this.selectedElements.length > 0) {
        this.clipboard = []
        this.selectedElements.map(el => {
          this.clipboard.push(cloneDeep(el))
          this.removeElement({page: this.page, elId: el.id})
        })
      }
    },

    pasteHandler () {
      if (this.clipboard.length > 0) {
        this.clipboard.map(el => {
          this.registerElement({pageId: this.page.id, el, global: el.global})
        })
      }
    },

    dropHandler (e) {
      const mainContainer = document.getElementById('main')
      let element = JSON.parse(e.dataTransfer.getData('text/plain'))

      let height = getRealDimension('height', element, this.page)
      let width = getRealDimension('width', element, this.page)
      console.log(height)
      console.log(width)

      let top = e.pageY + mainContainer.scrollTop - mainContainer.offsetTop - this.$el.offsetTop - (height / 2)
      let left = e.pageX + mainContainer.scrollLeft - mainContainer.offsetLeft - this.$el.offsetLeft - (width / 2)

      const fixedElement = fixElementToParentBounds({top, left, height, width}, this.page)
      element = {...element, ...fixedElement}

      this.registerElement({pageId: this.page.id, el: element, global: e.shiftKey})
    },

    selectStopHandler (selectionBox) {
      if ((selectionBox.top === selectionBox.bottom && selectionBox.left === selectionBox.right) ||
          (this.page.children.length === 0)) return

      let selectedElements = []
      this.page.children.forEach(childEl => {
        const child = (childEl.global) ? {...childEl, ...this.getComponentRef(childEl), id: childEl.id} : childEl

        let childBottom = getRealDimension('height', child, this.page) + child.top
        let childRight = getRealDimension('width', child, this.page) + child.left

        if (((child.top <= selectionBox.bottom) && (child.left <= selectionBox.right) &&
            (childBottom >= selectionBox.top) && (childRight >= selectionBox.left)) ||
            ((child.top <= selectionBox.bottom) && (childRight >= selectionBox.left) &&
            (childBottom >= selectionBox.top) && (child.left <= selectionBox.right))) {
          selectedElements.push(child)
        }
      })

      if (selectedElements.length > 0) {
        this._addSelectedElements(selectedElements)
      }
    },

    getComponentRef (component) {
      return this.projectComponents[this.projectComponents.findIndex(comp => comp.name === component.name)]
    },

    resizeStopHandler (resStopData) {
      resStopData.map(resElData => this.resizeElement({...resElData, pageId: this.page.id}))
    },

    movingHandler (absMouseX, absMouseY) {
      let containegg = this.getContaineggOnPoint(absMouseX, absMouseY)
      this.toggleDroppableCursor(containegg)
    },

    moveStopHandler (moveStopData) {
      const containegg = this.getContaineggOnPoint(moveStopData.absMouseX, moveStopData.absMouseY)
      const parentId = containegg ? containegg.id : null

      moveStopData.moveElData.map(moveData => this.moveElement({
        ...moveData,
        pageId: this.page.id,
        parentId,
        mouseX: moveStopData.relMouseX,
        mouseY: moveStopData.relMouseY
      }))

      this.toggleDroppableCursor(false)
    },

    getContaineggOnPoint (x, y) {
      const movingEggs = this.selectedElements
      const parentsIds = movingEggs.map(egg => egg.id.substring(0, egg.id.lastIndexOf('.')))
      const commonParentId = parentsIds.every((val, i, arr) => val === arr[0]) ? parentsIds[0] : null
      const elementsOnPoint = elementsFromPoint(x, y)

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

    ...mapActions([registerElement, removeElement, resizeElement, moveElement]),
    ...mapMutations([_clearSelectedElements, _addSelectedElements])
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
.stage {
  user-select: none;
  margin: 10px auto 35px !important;
  /* for paper style */
  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.2),
    0 1px 1px rgba(0, 0, 0, 0.14),
    0 2px 1px -1px rgba(0, 0, 0, 0.12);
}
</style>
