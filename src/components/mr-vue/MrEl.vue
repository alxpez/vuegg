<template>
  <div mr-el class="mrEl" :style="style">
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
  computed: {
    yo () {
      return this.$el.parentNode.getBoundingClientRect()
    },
    tu () {
      return this.$el.parentNode
    },
    style () {
      return {
        top: this.top + 'px',
        left: this.left + 'px',
        width: this.width + 'px',
        height: this.height + 'px',
        zIndex: this.zIndex
      }
    }
  },
  methods: {
    alertame () {
      console.log('ELEMENT PAPA---------------')
      console.log(this.yo)
      console.log(this.tu)
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
