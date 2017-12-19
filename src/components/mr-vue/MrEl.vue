<template>
  <div mr-el="true" class="mrEl" :style="style" @mousedown="e => $emit('activated', e)">
    <slot></slot>
    <div mr-handle="true"
      v-for="handle in handles"
      class="handle" :class="handle"
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
      default: 100,
      validator: function (val) {
        return val > 0
      }
    },
    height: {
      type: Number,
      default: 100,
      validator: function (val) {
        return val > 0
      }
    },
    minWidth: {
      type: Number,
      default: 20,
      validator: function (val) {
        return val > 0
      }
    },
    minHeight: {
      type: Number,
      default: 20,
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
        return ['mt', 'mr', 'mb', 'ml', 'tl', 'tr', 'br', 'bl']
      }
    }
  },
  computed: {
    style () {
      return {
        top: this.top + 'px',
        left: this.left + 'px',
        width: this.width + 'px',
        height: this.height + 'px',
        minWidth: this.minWidth + 'px',
        minHeight: this.minHeight + 'px',
        zIndex: this.zIndex
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
.tl {
  top: -3px;
  left: -3px;
  cursor: nwse-resize;
  background: #03a9f4;
}
.mt {
  top: 0;
  width: 100%;
  border-radius: 0;
  border-width: 2px;
  border-color: #03a9f4;
  border-style: solid none none none;
  cursor: ns-resize;
}
.tr {
  top: -3px;
  right: -3px;
  cursor: nesw-resize;
  background: #03a9f4;
}
.mr {
  top: 0;
  right: 0;
  height: 100%;
  border-radius: 0;
  border-width: 2px;
  border-color: #03a9f4;
  border-style: none solid none none;
  cursor: ew-resize;
}
.br {
  bottom: -3px;
  right: -3px;
  cursor: nwse-resize;
  background: #03a9f4;
}
.mb {
  bottom: 0;
  width: 100%;
  border-radius: 0;
  border-width: 2px;
  border-color: #03a9f4;
  border-style: none none solid none;
  cursor: ns-resize;
}
.bl {
  bottom: -3px;
  left: -3px;
  cursor: nesw-resize;
  background: #03a9f4;
}
.ml {
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
