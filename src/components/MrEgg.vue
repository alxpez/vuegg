<!--
MIT License

Copyright (c) 2017 Maurizio Bonani

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
-->

<template>
  <div class="mrEgg" @mousedown.stop.prevent="onEggDown"
    :style="style"
    :class="{
      draggable: draggable,
      resizable: resizable,
      active: enabled,
      dragging: dragging,
      resizing: resizing
    }"
  >
    <slot></slot>
    <div class="handle" @mousedown.stop.prevent="onControlDown(handle, $event)"
      v-if="resizable"
      v-for="handle in handles"
      :class="'handle-' + handle"
      :style="{ display: enabled ? 'block' : 'none'}"
    ></div>
  </div>
</template>


<script>
export default {
  replace: true,
  name: 'mr-egg',
  props: {
    parent: {
      type: Boolean,
      default: false
    },
    active: {
      type: Boolean,
      default: true
    },
    draggable: {
      type: Boolean,
      default: true
    },
    resizable: {
      type: Boolean,
      default: true
    },
    w: {
      type: Number,
      default: 200,
      validator: function (val) {
        return val > 0
      }
    },
    h: {
      type: Number,
      default: 200,
      validator: function (val) {
        return val > 0
      }
    },
    minw: {
      type: Number,
      default: 20,
      validator: function (val) {
        return val > 0
      }
    },
    minh: {
      type: Number,
      default: 20,
      validator: function (val) {
        return val > 0
      }
    },
    x: {
      type: Number,
      default: 0,
      validator: function (val) {
        return typeof val === 'number'
      }
    },
    y: {
      type: Number,
      default: 0,
      validator: function (val) {
        return typeof val === 'number'
      }
    },
    z: {
      type: [ String, Number ],
      default: 'auto',
      validator: function (val) {
        let valid = (typeof val === 'string') ? val === 'auto' : val >= 0
        return valid
      }
    },
    handles: {
      type: Array,
      default: function () {
        return ['tm', 'mr', 'bm', 'ml', 'tl', 'tr', 'br', 'bl']
      }
    },
    axis: {
      type: String,
      default: 'both',
      validator: function (val) {
        return ['x', 'y', 'both'].indexOf(val) !== -1
      }
    },
    grid: {
      type: Array,
      default: function () {
        return [1, 1]
      }
    }
  },
  data: function () {
    return {
      top: this.y,
      left: this.x,
      width: this.w,
      height: this.h,
      zIndex: this.z,
      enabled: this.active,
      resizing: false,
      dragging: false,
      handle: null
    }
  },
  created: function () {
    this.parentX = 0
    this.parentW = 9999
    this.parentY = 0
    this.parentH = 9999
  },
  mounted: function () {
    if (this.active) this.activategg()

    document.documentElement.addEventListener('mousedown', this.onMouseDown, true)
    document.documentElement.addEventListener('mouseup', this.onMouseUp, true)

    this.reviewDimensions()
  },
  beforeDestroy: function () {
    this.deactivategg()

    document.documentElement.removeEventListener('mousedown', this.onMouseDown, true)
    document.documentElement.removeEventListener('mouseup', this.onMouseUp, true)
  },
  methods: {
    reviewDimensions: function () {
      // TODO: get height and width from the element contained on the mrEgg

      if (this.minw > this.w) this.width = this.minw
      if (this.minh > this.h) this.height = this.minh

      this.elmW = this.width
      this.elmH = this.height

      this.elmX = parseInt(this.$el.style.left)
      this.elmY = parseInt(this.$el.style.top)

      if (this.parent) {
        this.parentW = parseInt(this.$el.parentNode.clientWidth, 10)
        this.parentH = parseInt(this.$el.parentNode.clientHeight, 10)
      }

      this.$emit('resizestop', this.left, this.top, this.width, this.height)
    },

    activategg: function () {
      this.enabled = true
      this.$emit('activated')
      this.$emit('update:active', true)
      document.documentElement.addEventListener('mousemove', this.onMouseMove, true)
    },

    deactivategg: function (e) {
      this.enabled = false
      this.$emit('deactivated')
      this.$emit('update:active', false)
      document.documentElement.removeEventListener('mousemove', this.onMouseMove, true)
    },

    onEggDown: function (e) {
      let target = e.target || e.srcElement

      if (this.$el.contains(target)) {
        this.lastMouseX = this.mouseX = e.pageX || e.clientX + document.documentElement.scrollLeft
        this.lastMouseY = this.mouseY = e.pageY || e.clientY + document.documentElement.scrollTop

        this.mouseOffX = this.mouseOffY = 0

        this.reviewDimensions()
        this.dragging = this.draggable

        if (!this.enabled) {
          this.activategg()
        }
      }
    },

    onControlDown: function (control, e) {
      this.handle = control
      this.resizing = true
    },

    onMouseMove: function (e) {
      this.mouseX = e.pageX || e.clientX + document.documentElement.scrollLeft
      this.mouseY = e.pageY || e.clientY + document.documentElement.scrollTop

      let diffX = this.mouseX - this.lastMouseX + this.mouseOffX
      let diffY = this.mouseY - this.lastMouseY + this.mouseOffY

      this.mouseOffX = this.mouseOffY = 0

      this.lastMouseX = this.mouseX
      this.lastMouseY = this.mouseY

      let dX = diffX
      let dY = diffY

      if (this.resizing) {
        if (this.handle.indexOf('t') >= 0) {
          if (this.elmH - dY < this.minh) this.mouseOffY = (dY - (diffY = this.elmH - this.minh))
          else if (this.elmY + dY < this.parentY) this.mouseOffY = (dY - (diffY = this.parentY - this.elmY))
          this.elmY += diffY
          this.elmH -= diffY
        }

        if (this.handle.indexOf('b') >= 0) {
          if (this.elmH + dY < this.minh) this.mouseOffY = (dY - (diffY = this.minh - this.elmH))
          else if (this.elmY + this.elmH + dY > this.parentH) this.mouseOffY = (dY - (diffY = this.parentH - this.elmY - this.elmH))
          this.elmH += diffY
        }

        if (this.handle.indexOf('l') >= 0) {
          if (this.elmW - dX < this.minw) this.mouseOffX = (dX - (diffX = this.elmW - this.minw))
          else if (this.elmX + dX < this.parentX) this.mouseOffX = (dX - (diffX = this.parentX - this.elmX))
          this.elmX += diffX
          this.elmW -= diffX
        }

        if (this.handle.indexOf('r') >= 0) {
          if (this.elmW + dX < this.minw) this.mouseOffX = (dX - (diffX = this.minw - this.elmW))
          else if (this.elmX + this.elmW + dX > this.parentW) this.mouseOffX = (dX - (diffX = this.parentW - this.elmX - this.elmW))
          this.elmW += diffX
        }

        this.left = (Math.round(this.elmX / this.grid[0]) * this.grid[0])
        this.top = (Math.round(this.elmY / this.grid[1]) * this.grid[1])

        this.width = (Math.round(this.elmW / this.grid[0]) * this.grid[0])
        this.height = (Math.round(this.elmH / this.grid[1]) * this.grid[1])

        this.$emit('resizing', this.left, this.top, this.width, this.height)
      } else if (this.dragging) {
        if (this.elmX + dX < this.parentX) this.mouseOffX = (dX - (diffX = this.parentX - this.elmX))
        else if (this.elmX + this.elmW + dX > this.parentW) this.mouseOffX = (dX - (diffX = this.parentW - this.elmX - this.elmW))

        if (this.elmY + dY < this.parentY) this.mouseOffY = (dY - (diffY = this.parentY - this.elmY))
        else if (this.elmY + this.elmH + dY > this.parentH) this.mouseOffY = (dY - (diffY = this.parentH - this.elmY - this.elmH))

        this.elmX += diffX
        this.elmY += diffY

        if (this.axis === 'x' || this.axis === 'both') {
          this.left = (Math.round(this.elmX / this.grid[0]) * this.grid[0])
        }
        if (this.axis === 'y' || this.axis === 'both') {
          this.top = (Math.round(this.elmY / this.grid[1]) * this.grid[1])
        }

        this.$emit('dragging', this.left, this.top, this.mouseX, this.mouseY)
      }
    },

    onMouseUp: function (e) {
      this.handle = null
      if (this.resizing) {
        this.resizing = false
        this.$emit('resizestop', this.left, this.top, this.width, this.height)
      }
      if (this.dragging) {
        this.dragging = false
        this.$emit('dragstop', this.left, this.top, this.mouseX, this.mouseY)
      }
    },

    onMouseDown: function (e) {
      if (this.enabled) {
        let target = e.target || e.srcElement
        let regex = new RegExp('handle-([trmbl]{2})', '')

        if ((this.$el.id !== target.id || !this.$el.contains(target)) && !regex.test(target.className)) {
          this.deactivategg()
        }
      }
    }
  },
  computed: {
    style: function () {
      return {
        top: this.top + 'px',
        left: this.left + 'px',
        width: this.width + 'px',
        height: this.height + 'px',
        zIndex: this.zIndex
      }
    }
  },
  watch: {
    active: function (val) {
      this.enabled = val
    },
    x: function (val) {
      if ((this.elmX + val >= this.parentX) && (val + this.elmW <= this.parentW)) {
        this.left = (Math.round(val / this.grid[0]) * this.grid[0])
      }
      this.$emit('resizestop', this.left, this.top, this.width, this.height)
    },
    y: function (val) {
      if ((this.elmY + val >= this.parentY) && (val + this.elmH <= this.parentH)) {
        this.top = (Math.round(val / this.grid[1]) * this.grid[1])
      }
      this.$emit('resizestop', this.left, this.top, this.width, this.height)
    },
    w: function (val) {
      if (val > 0 && this.elmX + val <= this.parentW) {
        this.width = (Math.round(val / this.grid[0]) * this.grid[0])
      }
      this.$emit('resizestop', this.left, this.top, this.width, this.height)
    },
    h: function (val) {
      if (val > 0 && this.elmY + val <= this.parentH) {
        this.height = (Math.round(val / this.grid[1]) * this.grid[1])
      }
      this.$emit('resizestop', this.left, this.top, this.width, this.height)
    },
    z: function (val) {
      if (val >= 0 || val === 'auto') {
        this.zIndex = val
      }
    }
  }
}
</script>


<style scoped>
  .mrEgg {
    position: absolute;
    box-sizing: border-box;
  }
  .draggable:hover {
    cursor: move;
  }
  .handle {
    box-sizing: border-box;
    display: none;
    position: absolute;
    width: 6px;
    height: 6px;
    font-size: 1px;
    border: 1px solid rgba(170, 170, 170, 0.8);
  }
  .handle-tl {
    top: 0;
    left: 0;
    cursor: nwse-resize;
    background: rgba(221, 221, 221, 0.5);
  }
  .handle-tm {
    top: 0;
    width: 100%;
    border-style: dashed none none none;
    cursor: ns-resize;
  }
  .handle-tr {
    top: 0;
    right: 0;
    cursor: nesw-resize;
    background: rgba(221, 221, 221, 0.5);
  }
  .handle-mr {
    top: 0;
    right: 0;
    height: 100%;
    border-style: none dashed none none;
    cursor: ew-resize;
  }
  .handle-br {
    bottom: 0;
    right: 0;
    cursor: nwse-resize;
    background: rgba(221, 221, 221, 0.5);
  }
  .handle-bm {
    bottom: 0;
    width: 100%;
    border-style: none none dashed none;
    cursor: ns-resize;
  }
  .handle-bl {
    bottom: 0;
    left: 0;
    cursor: nesw-resize;
    background: rgba(221, 221, 221, 0.5);
  }
  .handle-ml {
    top: 0;
    left: 0;
    height: 100%;
    border-style: none none none dashed;
    cursor: ew-resize;
  }
</style>
