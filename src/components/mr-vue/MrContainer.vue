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
      this.moving = val.length > 0
      this.mrElements = val.map(el => {
        if (document.getElementById(el.id)) return document.getElementById(el.id).parentElement
      })
    }
  },
  mounted: function () {
    this.mainContainer = document.getElementById('main')
  },
  methods: {
    mouseDownHandler (e) {
      if (e.target.getAttribute('mr-container')) {
        this.$emit('clearselection')
      } else if (e.target.getAttribute('mr-handle')) {
        this.resizing = true
        this.handle = e.target.classList[1]
        this.$emit('resizestart')
      }
    },

    mouseUpHandler (e) {
      if (this.resizing) {
        this.$emit('resizestop', this.resizeStopData())
      } else if (this.moving) {
        this.$emit('movestop', this.moveStopData())
      }
      this.resizing = false
      this.handle = null
      this.moving = false
    },

    // TODO: Review this functionality / Other options?
    mouseOutHandler (e) {
      if (this.getParentMr(e.fromElement) !== null && this.getParentMr(e.toElement) === null) {
        if (this.resizing) {
          this.$emit('resizestop', this.resizeStopData())
        } else if (this.moving) {
          this.$emit('movestop', this.moveStopData())
        }
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
        this.absMouseX = e.clientX
        this.absMouseY = e.clientY
        this.relMouseX = e.pageX + this.mainContainer.scrollLeft - this.$el.offsetLeft
        this.relMouseY = e.pageY + this.mainContainer.scrollTop - this.$el.offsetTop
        this.$emit('moving', this.absMouseX, this.absMouseY)
        this.mrElements.map(mrEl => this.moveElementBy(mrEl, e.movementX, e.movementY))
      }
    },

    resizeElementBy (el, offX, offY) {
      const elementRect = el.getBoundingClientRect()
      let newHeight = null
      let newWidth = null
      let newTop = null
      let newLeft = null

      switch (this.handle) {
        case 'tl':
          newHeight = elementRect.height - offY
          newWidth = elementRect.width - offX
          newTop = el.offsetTop + offY
          newLeft = el.offsetLeft + offX
          break
        case 'mt':
          newHeight = elementRect.height - offY
          newTop = el.offsetTop + offY
          break
        case 'tr':
          newHeight = elementRect.height - offY
          newWidth = elementRect.width + offX
          newTop = el.offsetTop + offY
          break
        case 'mr':
          newWidth = elementRect.width + offX
          break
        case 'br':
          newHeight = elementRect.height + offY
          newWidth = elementRect.width + offX
          break
        case 'mb':
          newHeight = elementRect.height + offY
          break
        case 'bl':
          newHeight = elementRect.height + offY
          newWidth = elementRect.width - offX
          newLeft = el.offsetLeft + offX
          break
        case 'ml':
          newWidth = elementRect.width - offX
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
      const parentRect = this.getParentMr(el).getBoundingClientRect()
      const elementRect = el.getBoundingClientRect()

      switch (property) {
        case 'top':
          isOk = ((val >= 0) && (val + elementRect.height <= parentRect.height))
          break
        case 'left':
          isOk = ((val >= 0) && (val + elementRect.width <= parentRect.width))
          break
        case 'height':
          isOk = ((val <= parentRect.height) && (val + el.offsetTop <= parentRect.height) &&
                  (val >= parseInt(el.style.minHeight)))
          break
        case 'width':
          isOk = ((val <= parentRect.width) && (val + el.offsetLeft <= parentRect.width) &&
                  (val >= parseInt(el.style.minWidth)))
          break
      }
      return isOk
    },

    getParentMr (element) {
      let parentMr = null
      let currentMr = element

      while (parentMr === null) {
        if (currentMr === null || currentMr.parentElement === null) {
          break
        } else if (currentMr.getAttribute('mr-container') !== null) {
          parentMr = currentMr
        } else if (currentMr.parentElement.getAttribute('mr-el') !== null) {
          parentMr = currentMr.parentElement
        }
        currentMr = currentMr.parentElement
      }
      return parentMr
    },

    resizeStopData () {
      return this.mrElements.map(el => {
        let elRect = el.getBoundingClientRect()
        return {
          elId: el.childNodes[0].id,
          top: el.offsetTop,
          left: el.offsetLeft,
          height: elRect.height,
          width: elRect.width
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
}
</style>
