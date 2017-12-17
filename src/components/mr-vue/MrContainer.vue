<template>
  <div mr-container="true" class="mrContainer"
    @mousedown.prevent.capture='mouseDownHandler'
    @mousemove.stop.prevent='mouseMoveHandler'
    @mouseout.stop.prevent='mouseOutHandler'
    @mouseup.stop.prevent='mouseUpHandler'>
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
      handle: null,
      mrElements: [],
      mainContainer: null
    }
  },
  watch: {
    activeElements: function (val) {
      this.mrElements = val.map(el => {
        return document.getElementById(el.id)
          ? document.getElementById(el.id).parentElement
          : null
      })
      this.moving = val.length > 0
    }
  },
  mounted: function () {
    this.mainContainer = document.getElementById('main')
  },
  methods: {
    mouseDownHandler (e) {
      this.setMousePosition(e)

      if (e.target.getAttribute('mr-container')) {
        this.$emit('clearselection')
      } else if (e.target.getAttribute('mr-handle')) {
        this.resizing = true
        this.handle = e.target.classList[1]
        this.$emit('resizestart')
      }
    },

    mouseUpHandler (e) {
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
        this.mrElements.map(mrEl => mrEl ? this.resizeElementBy(mrEl, e.movementX, e.movementY) : mrEl)
      } else if (this.moving) {
        this.setMousePosition(e)
        this.$emit('moving', this.absMouseX, this.absMouseY)
        this.mrElements.map(mrEl => mrEl ? this.moveElementBy(mrEl, e.movementX, e.movementY) : mrEl)
      }
    },

    resizeElementBy (el, offX, offY) {
      let newHeight = null
      let newWidth = null
      let newTop = null
      let newLeft = null

      switch (this.handle) {
        case 'tl':
          newHeight = parseInt(el.style.height) - offY
          newWidth = parseInt(el.style.width) - offX
          newTop = el.offsetTop + offY
          newLeft = el.offsetLeft + offX
          break
        case 'mt':
          newHeight = parseInt(el.style.height) - offY
          newTop = el.offsetTop + offY
          break
        case 'tr':
          newHeight = parseInt(el.style.height) - offY
          newWidth = parseInt(el.style.width) + offX
          newTop = el.offsetTop + offY
          break
        case 'mr':
          newWidth = parseInt(el.style.width) + offX
          break
        case 'br':
          newHeight = parseInt(el.style.height) + offY
          newWidth = parseInt(el.style.width) + offX
          break
        case 'mb':
          newHeight = parseInt(el.style.height) + offY
          break
        case 'bl':
          newHeight = parseInt(el.style.height) + offY
          newWidth = parseInt(el.style.width) - offX
          newLeft = el.offsetLeft + offX
          break
        case 'ml':
          newWidth = parseInt(el.style.width) - offX
          newLeft = el.offsetLeft + offX
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
          isOk = ((val >= 0) && (val + parseInt(el.style.height) <= parseInt(parent.style.height)))
          break
        case 'left':
          isOk = ((val >= 0) && (val + parseInt(el.style.width) <= parseInt(parent.style.width)))
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

    setMousePosition (e) {
      this.absMouseX = e.clientX
      this.absMouseY = e.clientY
      this.relMouseX = e.pageX + this.mainContainer.scrollLeft - this.$el.offsetLeft
      this.relMouseY = e.pageY + this.mainContainer.scrollTop - this.$el.offsetTop
    },

    resizeStopData () {
      return this.mrElements.map(el => {
        if (el) {
          return {
            elId: el.childNodes[0].id,
            top: el.offsetTop,
            left: el.offsetLeft,
            height: parseInt(el.style.height),
            width: parseInt(el.style.width)
          }
        }
      })
    },

    moveStopData () {
      return {
        moveElData: this.mrElements.map(el => {
          if (el) {
            return {
              elId: el.childNodes[0].id,
              top: el.offsetTop,
              left: el.offsetLeft
            }
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
}
</style>
