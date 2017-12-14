<template>
  <div mr-el class="mrEl" :style="style" @mousedown.stop.prevent="onElDown">
    <slot></slot>
    <div mr-el-handle
      v-for="handle in handles"
      class="handle"
      :class="'handle-' + handle"
      :style="{ display: active ? 'block' : 'none'}"
    ></div>
  </div>
</template>

<script>
export default {
  name: 'mr-el',
  props: {
    active: {
      type: Boolean,
      default: false
    },
    width: {
      type: Number,
      default: 200,
      validator: function (val) {
        return val > 0
      }
    },
    height: {
      type: Number,
      default: 200,
      validator: function (val) {
        return val > 0
      }
    },
    left: {
      type: Number,
      default: 0,
      validator: function (val) {
        return typeof val === 'number'
      }
    },
    top: {
      type: Number,
      default: 0,
      validator: function (val) {
        return typeof val === 'number'
      }
    },
    zIndex: {
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
    }
  },
  data: function () {
    return {
      t: this.top,
      l: this.left,
      w: this.width,
      h: this.height,
      z: this.zIndex,
      enabled: this.active
      // resizing: false,
      // dragging: false,
      // handle: null
    }
  },
  methods: {
    onElDown (e) {
      this.$emit('activated', e)
    },
    posize () {
      console.log('OffsetLeft ' + this.$el.offsetLeft)
      console.log('OffsetTop ' + this.$el.offsetTop)
      console.log('Height ' + this.$el.getBoundingClientRect().height)
      console.log('Width ' + this.$el.getBoundingClientRect().width)
    }
  },
  computed: {
    style () {
      return {
        top: this.t + 'px',
        left: this.l + 'px',
        width: this.w + 'px',
        height: this.h + 'px',
        zIndex: this.z
      }
    }
  },
  watch: {
    active: function (val) {
      this.enabled = val
    },
    left: function (val) {
      this.l = val
    },
    top: function (val) {
      this.t = val
    },
    width: function (val) {
      this.w = val
    },
    height: function (val) {
      this.h = val
    },
    zIndex: function (val) {
      if (val >= 0 || val === 'auto') {
        this.z = val
      }
    }
  }
}
</script>


<style scoped>
  .mrEl {
    position: absolute;
    box-sizing: border-box;
  }

  .mrEl:hover {
    cursor: move;
  }

  .mrEl > * {
    margin: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: absolute;
    box-sizing: border-box;
  }

  .handle {
    box-sizing: border-box;
    display: none;
    position: absolute;
    width: 10px;
    height: 10px;
    font-size: 1px;
    border-radius: 50%;
    border: 1px solid #fff;
  }
  .handle-tl {
    top: -3px;
    left: -3px;
    cursor: nwse-resize;
    background: #03a9f4;
  }
  .handle-tm {
    top: 0;
    width: 100%;
    border-radius: 0;
    border-width: 2px;
    border-color: #03a9f4;
    border-style: solid none none none;
    cursor: ns-resize;
  }
  .handle-tr {
    top: -3px;
    right: -3px;
    cursor: nesw-resize;
    background: #03a9f4;
  }
  .handle-mr {
    top: 0;
    right: 0;
    height: 100%;
    border-radius: 0;
    border-width: 2px;
    border-color: #03a9f4;
    border-style: none solid none none;
    cursor: ew-resize;
  }
  .handle-br {
    bottom: -3px;
    right: -3px;
    cursor: nwse-resize;
    background: #03a9f4;
  }
  .handle-bm {
    bottom: 0;
    width: 100%;
    border-radius: 0;
    border-width: 2px;
    border-color: #03a9f4;
    border-style: none none solid none;
    cursor: ns-resize;
  }
  .handle-bl {
    bottom: -3px;
    left: -3px;
    cursor: nesw-resize;
    background: #03a9f4;
  }
  .handle-ml {
    top: 0;
    left: 0;
    height: 100%;
    border-radius: 0;
    border-width: 2px;
    border-color: #03a9f4;
    border-style: none none none solid;
    cursor: ew-resize;
  }
</style>
