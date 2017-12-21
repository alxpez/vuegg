<template>
  <div mr-container="true" class="mrContainer" tabindex="0"
    @mousedown.prevent.capture="mouseDownHandler"
    @mousemove.stop.prevent="mouseMoveHandler"
    @mouseout.stop.prevent="mouseOutHandler"
    @mouseup.stop.prevent="mouseUpHandler"
    @keydown.delete.stop.prevent="keydownHandler"
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
    keydownHandler (e) {
      this.$emit('removeselection')
    },

    mouseDownHandler (e) {
      this.setMousePosition(e)

      if (e.target.getAttribute('mr-container')) {
        this.$emit('clearselection')
      } else if (e.target.getAttribute('mr-handle')) {
        this.resizing = true
        this.handle = e.target.classList[1]
        this.$emit('resizestart')
      } else if (this.getParentMr(e.target)) {
        this.moving = true
        this.$emit('movestart')
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
    },

    // TODO: Review this functionality / Other options?
    mouseOutHandler (e) {
      if (this.getParentMr(e.fromElement) !== null && this.getParentMr(e.toElement) === null) {
        if (this.resizing) this.$emit('resizestop', this.resizeStopData())
        else if (this.moving) this.$emit('movestop', this.moveStopData())

        this.resizing = false
        this.handle = null
        this.moving = false
      }
    },

    mouseMoveHandler (e) {
      if (this.resizing) {
        this.$emit('resizing')
        this.mrElements.map(mrEl => this.resizeElementBy(mrEl, e.movementX, e.movementY))
      } else if (this.moving) {
        this.setMousePosition(e)
        this.$emit('moving', this.absMouseX, this.absMouseY)
        this.mrElements.map(mrEl => this.moveElementBy(mrEl, e.movementX, e.movementY))
      }
    },

    resizeElementBy (el, offX, offY) {
      const parent = this.getParentMr(el)

      let newHeight = this.calculateHeight(el, parent)
      let newWidth = this.calculateWidth(el, parent)
      let newTop = el.offsetTop
      let newLeft = el.offsetLeft

      switch (this.handle) {
        case 'tl':
          newHeight -= offY
          newWidth -= offX
          newTop += offY
          newLeft += offX
          break
        case 'mt':
          newHeight -= offY
          newTop += offY
          newLeft = newWidth = null
          break
        case 'tr':
          newHeight -= offY
          newWidth += offX
          newTop += offY
          newLeft = null
          break
        case 'mr':
          newHeight
          newWidth += offX
          newHeight = newTop = newLeft = null
          break
        case 'br':
          newHeight += offY
          newWidth += offX
          newTop = newLeft = null
          break
        case 'mb':
          newHeight += offY
          newWidth = newTop = newLeft = null
          break
        case 'bl':
          newHeight += offY
          newWidth -= offX
          newLeft += offX
          newTop = null
          break
        case 'ml':
          newWidth -= offX
          newLeft += offX
          newHeight = newTop = null
          break
      }

      if ((this.checkBounds(el, newTop, 'top')) &&
          (this.checkBounds(el, newHeight, 'height'))) el.style.top = newTop + 'px'

      if ((this.checkBounds(el, newLeft, 'left')) &&
          (this.checkBounds(el, newWidth, 'width'))) el.style.left = newLeft + 'px'

      if (this.checkBounds(el, newHeight, 'height')) el.style.height = newHeight + 'px'
      if (this.checkBounds(el, newWidth, 'width')) el.style.width = newWidth + 'px'
    },

    moveElementBy (el, offX, offY) {
      const newTop = el.offsetTop + offY
      const newLeft = el.offsetLeft + offX

      if (this.checkBounds(el, newTop, 'top')) el.style.top = newTop + 'px'
      if (this.checkBounds(el, newLeft, 'left')) el.style.left = newLeft + 'px'
    },

    checkBounds (el, val, property) {
      let isOk = true
      const parent = this.getParentMr(el)

      switch (property) {
        case 'top':
          isOk = ((val >= 0) && (val + this.calculateHeight(el, parent) <= parseInt(parent.style.height)))
          break
        case 'left':
          isOk = ((val >= 0) && (val + this.calculateWidth(el, parent) <= parseInt(parent.style.width)))
          break
        case 'height':
          isOk = ((val <= parseInt(parent.style.height)) && (val >= parseInt(el.style.minHeight)) &&
                  (val + el.offsetTop <= parseInt(parent.style.height)))
          break
        case 'width':
          isOk = ((val <= parseInt(parent.style.width)) && (val >= parseInt(el.style.minWidth)) &&
                  (val + el.offsetLeft <= parseInt(parent.style.width)))
          break
      }
      return isOk
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
      this.relMouseX = e.pageX + mainContainer.scrollLeft - this.$el.offsetLeft
      this.relMouseY = e.pageY + mainContainer.scrollTop - this.$el.offsetTop
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
