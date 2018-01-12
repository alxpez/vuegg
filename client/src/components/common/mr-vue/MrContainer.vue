<template>
  <div mr-container="true"
    @mousedown.prevent.capture="mouseDownHandler"
    @keydown.delete.stop.prevent="keyDownHandler"
    @drop="e => $emit('drop', e)"
    @dragover.prevent
    class="mrContainer"
    tabindex="0"
  >
    <slot></slot>
  </div>
</template>


<script>
export default {
  name: 'mr-container',
  props: ['activeElements'],
  data: function () {
    return {
      relMouseX: 0,
      relMouseY: 0,
      absMouseX: 0,
      absMouseY: 0,
      moving: false,
      resizing: false,
      handle: null
    }
  },
  computed: {
    mrElements () {
      return this.activeElements.map(el => document.getElementById(el.id).parentElement)
    }
  },
  methods: {
    keyDownHandler (e) {
      this.$emit('removeselection')
    },

    mouseDownHandler (e) {
      let isMr = false
      this.setMousePosition(e)

      if (e.target.getAttribute('mr-container')) {
        this.$emit('clearselection')
      } else if (e.target.getAttribute('mr-handle')) {
        isMr = this.resizing = true
        this.handle = e.target.classList[1]
        this.$emit('resizestart')
      } else if (this.getParentMr(e.target)) {
        isMr = this.moving = true
        this.$emit('movestart')
      }

      if (isMr) {
        document.documentElement.addEventListener('mousemove', this.mouseMoveHandler, true)
        document.documentElement.addEventListener('mouseup', this.mouseUpHandler, true)
      }
    },

    mouseUpHandler (e) {
      // Saves the scroll position before giving focus and sets it back after focus
      const mainContainer = document.getElementById('main')
      let currentScroll = mainContainer.scrollTop
      this.$el.focus()
      mainContainer.scrollTop = currentScroll

      if (this.resizing) this.$emit('resizestop', this.resizeStopData())
      else if (this.moving) this.$emit('movestop', this.moveStopData())

      this.resizing = false
      this.handle = null
      this.moving = false

      document.documentElement.removeEventListener('mousemove', this.mouseMoveHandler, true)
      document.documentElement.removeEventListener('mouseup', this.mouseUpHandler, true)
    },

    mouseMoveHandler (e) {
      if (this.resizing || this.moving) {
        let offX = e.clientX - this.absMouseX
        let offY = e.clientY - this.absMouseY

        this.setMousePosition(e)

        if (this.resizing) {
          this.mrElements.map(mrEl => this.resizeElementBy(mrEl, offX, offY))
          this.$emit('resizing')
        } else if (this.moving) {
          this.mrElements.map(mrEl => this.moveElementBy(mrEl, offX, offY))
          this.$emit('moving', this.absMouseX, this.absMouseY)
        }
      }
    },

    resizeElementBy (el, offX, offY) {
      const parent = this.getParentMr(el)

      const parentH = parseInt(parent.style.height)
      const parentW = parseInt(parent.style.width)
      const elMinH = parseInt(el.style.minHeight)
      const elMinW = parseInt(el.style.minWidth)

      let newHeight = this.calculateHeight(el, parent)
      let newWidth = this.calculateWidth(el, parent)
      let newTop = el.offsetTop
      let newLeft = el.offsetLeft

      let diffX = offX
      let diffY = offY

      if (this.handle.indexOf('t') !== -1) {
        if (newHeight - offY < elMinH) diffY = newHeight - elMinH
        else if (newTop + offY < 0) diffY = 0 - newTop
        newTop += diffY
        newHeight -= diffY
      }
      if (this.handle.indexOf('l') !== -1) {
        if (newWidth - offX < elMinW) diffX = newWidth - elMinW
        else if (newLeft + offX < 0) diffX = 0 - newLeft
        newLeft += diffX
        newWidth -= diffX
      }
      if (this.handle.indexOf('b') !== -1) {
        if (newHeight + offY < elMinH) diffY = elMinH - newHeight
        else if (newTop + newHeight + offY > parentH) diffY = parentH - newTop - newHeight
        newHeight += diffY
      }
      if (this.handle.indexOf('r') !== -1) {
        if (newWidth + offX < elMinW) diffX = elMinW - newWidth
        else if (newLeft + newWidth + offX > parentW) diffX = parentW - newLeft - newWidth
        newWidth += diffX
      }

      el.style.top = newTop + 'px'
      el.style.left = newLeft + 'px'
      el.style.height = newHeight + 'px'
      el.style.width = newWidth + 'px'
    },

    moveElementBy (el, offX, offY) {
      el.style.top = this.fixPosition(el, el.offsetTop + offY, 'top') + 'px'
      el.style.left = this.fixPosition(el, el.offsetLeft + offX, 'left') + 'px'
    },

    fixPosition (el, val, prop) {
      if (val < 0) return 0

      const parent = this.getParentMr(el)
      const elHeight = this.calculateHeight(el, parent)
      const elWidth = this.calculateWidth(el, parent)

      if ((prop === 'top') && (val + elHeight > parseInt(parent.style.height))) {
        return parseInt(parent.style.height) - elHeight
      }
      if ((prop === 'left') && (val + elWidth > parseInt(parent.style.width))) {
        return parseInt(parent.style.width) - elWidth
      }
      return val
    },

    getParentMr (element) {
      let parentMr = null
      let currentMr = element

      while (parentMr === null) {
        if (currentMr === null || currentMr.parentElement === null) break
        else if (currentMr.getAttribute('mr-container') !== null) parentMr = currentMr
        else if (currentMr.parentElement.getAttribute('mr-el') !== null) parentMr = currentMr.parentElement

        currentMr = currentMr.parentElement
      }
      return parentMr
    },

    calculateHeight (el, parent) {
      return (el.style.height.indexOf('%') !== -1)
        ? (parseInt(parent.style.height) * (parseInt(el.style.height.replace('%', '')) / 100))
        : parseInt(el.style.height)
    },

    calculateWidth (el, parent) {
      return (el.style.width.indexOf('%') !== -1)
        ? (parseInt(parent.style.width) * (parseInt(el.style.width.replace('%', '')) / 100))
        : parseInt(el.style.width)
    },

    setMousePosition (e) {
      const mainContainer = document.getElementById('main')

      this.absMouseX = e.clientX
      this.absMouseY = e.clientY
      this.relMouseX = e.pageX + mainContainer.scrollLeft - mainContainer.offsetLeft - this.$el.offsetLeft
      this.relMouseY = e.pageY + mainContainer.scrollTop - mainContainer.offsetTop - this.$el.offsetTop
    },

    resizeStopData () {
      return this.mrElements.map(el => {
        return {
          elId: el.childNodes[0].id,
          top: el.offsetTop,
          left: el.offsetLeft,
          height: (el.style.height.indexOf('%') !== -1) ? el.style.height : parseInt(el.style.height),
          width: (el.style.width.indexOf('%') !== -1) ? el.style.width : parseInt(el.style.width)
        }
      })
    },

    moveStopData () {
      return {
        moveElData: this.mrElements.map(el => {
          return {
            elId: el.childNodes[0].id,
            top: el.offsetTop,
            left: el.offsetLeft
          }
        }),
        relMouseX: this.relMouseX,
        relMouseY: this.relMouseY,
        absMouseX: this.absMouseX,
        absMouseY: this.absMouseY
      }
    }
  }
}
</script>


<style scoped>
.mrContainer {
  position: relative;
  outline: none;
}
</style>
