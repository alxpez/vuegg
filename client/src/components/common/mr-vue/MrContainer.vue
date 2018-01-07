<template>
  <div mr-container="true" class="mrContainer" tabindex="0"
    @mousedown.prevent.capture="mouseDownHandler"
    @keydown.delete.stop.prevent="keyDownHandler"
    @drop="e => $emit('drop', e)"
    @dragover.prevent
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

      if (this.checkBounds(el, newHeight, 'height')) {
        if (newTop !== null) {
          newTop = this.fixPosition(el, newTop, 'top')
          el.style.top = newTop + 'px'

          if (newTop !== 0) el.style.height = newHeight + 'px'
        } else el.style.height = newHeight + 'px'
      }

      if (this.checkBounds(el, newWidth, 'width')) {
        if (newLeft !== null) {
          newLeft = this.fixPosition(el, newLeft, 'left')
          el.style.left = newLeft + 'px'

          if (newLeft !== 0) el.style.width = newWidth + 'px'
        } else el.style.width = newWidth + 'px'
      }
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

    checkBounds (el, val, prop) {
      const parent = this.getParentMr(el)

      if (prop === 'height') {
        return ((val + el.offsetTop <= parseInt(parent.style.height)) &&
                (val <= parseInt(parent.style.height)) && (val >= parseInt(el.style.minHeight)))
      }
      if (prop === 'width') {
        return ((val + el.offsetLeft <= parseInt(parent.style.width)) &&
                (val <= parseInt(parent.style.width)) && (val >= parseInt(el.style.minWidth)))
      }
      return true
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
