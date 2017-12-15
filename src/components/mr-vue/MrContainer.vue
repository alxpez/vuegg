<template>
  <div mr-container class="mrContainer"
    @mousedown.capture='mDownHandler'
    @mousemove='mMoveHandler'
    @mouseout='mOutHandler'
    @mouseup='mUpHandler'>
    <slot></slot>
  </div>
</template>


<script>
export default {
  name: 'mr-container',
  props: ['activeElements'],
  data: function () {
    return {
      moving: false,
      lastMouseX: 0,
      lastMouseY: 0,
      resizing: false,
      handle: null,
      mrElements: [],
      mainContainer: null
    }
  },
  watch: {
    activeElements: function (val) {
      this.moving = val.length > 0
      this.mrElements = val.map(el => document.getElementById(el.id).parentElement)
    }
  },
  mounted: function () {
    this.mainContainer = document.getElementById('main')
  },
  methods: {
    mDownHandler (e) {
      if (e.target.getAttribute('mr-container') !== null) {
        this.$emit('clearselection')
      } else if (e.target.getAttribute('mr-handle') !== null) {
        this.resizing = true
        this.handle = e.target.classList[1]
        this.$emit('resizestart')
      }
    },

    mUpHandler (e) {
      if (this.resizing) {
        this.$emit('resizestop', this.resizeStopData())
      } else if (this.moving) {
        this.$emit('movestop', this.moveStopData())
      }
      this.resizing = false
      this.handle = null
      this.moving = false
    },

    // Review this functionality
    mOutHandler (e) {
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

    mMoveHandler (e) {
      if (this.resizing) {
        this.$emit('resizing')
        this.mrElements.map(mrEl => this.resizeElementBy(mrEl, e.movementX, e.movementY))
      } else if (this.moving) {
        this.$emit('moving')
        this.lastMouseX = e.pageX + this.mainContainer.scrollLeft - this.$el.offsetLeft
        this.lastMouseY = e.pageY + this.mainContainer.scrollTop - this.$el.offsetTop
        this.mrElements.map(mrEl => this.moveElementBy(mrEl, e.movementX, e.movementY))
      }
    },

    resizeElementBy (element, offX, offY) {
      let newHeight = null
      let newWidth = null
      let newTop = null
      let newLeft = null

      switch (this.handle) {
        case 'tl':
          newHeight = element.getBoundingClientRect().height - offY
          newWidth = element.getBoundingClientRect().width - offX
          newTop = element.offsetTop + offY
          newLeft = element.offsetLeft + offX
          break
        case 'mt':
          newHeight = element.getBoundingClientRect().height - offY
          newTop = element.offsetTop + offY
          break
        case 'tr':
          newHeight = element.getBoundingClientRect().height - offY
          newWidth = element.getBoundingClientRect().width + offX
          newTop = element.offsetTop + offY
          break
        case 'mr':
          newWidth = element.getBoundingClientRect().width + offX
          break
        case 'br':
          newHeight = element.getBoundingClientRect().height + offY
          newWidth = element.getBoundingClientRect().width + offX
          break
        case 'mb':
          newHeight = element.getBoundingClientRect().height + offY
          break
        case 'bl':
          newHeight = element.getBoundingClientRect().height + offY
          newWidth = element.getBoundingClientRect().width - offX
          newLeft = element.offsetLeft + offX
          break
        case 'ml':
          newWidth = element.getBoundingClientRect().width - offX
          newLeft = element.offsetLeft + offX
          break
      }

      if (this.checkBounds(element, newTop, 'top')) element.style.top = newTop + 'px'
      if (this.checkBounds(element, newLeft, 'left')) element.style.left = newLeft + 'px'
      if (this.checkBounds(element, newHeight, 'height')) element.style.height = newHeight + 'px'
      if (this.checkBounds(element, newWidth, 'width')) element.style.width = newWidth + 'px'
    },

    moveElementBy (element, offX, offY) {
      let newTop = element.offsetTop + offY
      let newLeft = element.offsetLeft + offX

      if (this.checkBounds(element, newTop, 'top')) element.style.top = newTop + 'px'
      if (this.checkBounds(element, newLeft, 'left')) element.style.left = newLeft + 'px'
    },

    checkBounds (el, val, property) {
      let isOk = true
      let parentRect = this.getParentMr(el).getBoundingClientRect()
      let elementRect = el.getBoundingClientRect()

      switch (property) {
        case 'top': isOk = (val >= 0 && (val + elementRect.height < parentRect.height)); break
        case 'left': isOk = (val >= 0 && (val + elementRect.width < parentRect.width)); break
        case 'height': isOk = (val < parentRect.height && (val + el.offsetTop < parentRect.height)); break
        case 'width': isOk = (val < parentRect.width && (val + el.offsetLeft < parentRect.width)); break
      }
      return isOk
    },

    getParentMr (element) {
      let mrParent = null
      let currentMr = element
      while (mrParent === null) {
        if (currentMr === null || currentMr.parentElement === null) {
          break
        } else if (currentMr.getAttribute('mr-container') !== null) {
          mrParent = currentMr
        } else if (currentMr.parentElement.getAttribute('mr-el') !== null) {
          mrParent = currentMr.parentElement
        }
        currentMr = currentMr.parentElement
      }
      return mrParent
    },

    resizeStopData () {
      return this.mrElements.map(el => {
        return {
          elId: el.childNodes[0].id,
          top: parseInt(el.style.top),
          left: parseInt(el.style.left),
          height: parseInt(el.style.height),
          width: parseInt(el.style.width)
        }
      })
    },

    moveStopData () {
      return this.mrElements.map(el => {
        return {
          elId: el.childNodes[0].id,
          top: parseInt(el.style.top),
          left: parseInt(el.style.left),
          mouseX: this.lastMouseX,
          mouseY: this.lastMouseY
        }
      })
    }
  }
}
</script>


<style scoped>
.mrContainer {
  position: relative;
}
</style>
