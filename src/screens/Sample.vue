<template>
  <div id="app">
    <div style="height: 500px; width: 500px; margin: 20px; border: 1px solid red; position: relative;">
      <vue-draggable-resizable :x="x" :y="y" :w="w" :h="h" :parent="true" @resizing="onResize" @dragging="onDrag">
        <p>Component</p>
      </vue-draggable-resizable>
    </div>
    <div>
      <button @click="changeTest">test</button>
      X <input type="number" v-model.number.lazy="x"> / Y <input type="number" v-model.number="y"> <br>
      Width <input type="number" v-model.number.lazy="w"> / Height <input type="number" v-model.number="h">
    </div>
  </div>
</template>

<script>

export default {
  data: function () {
    return {
      x: 50,
      y: 50,
      w: 200,
      h: 200
    }
  },
  methods: {
    onResize: function (x, y, width, height) {
      this.x = x
      this.y = y
      this.w = width
      this.h = height
    },
    onDrag: function (x, y) {
      this.x = x
      this.y = y
    },
    changeTest: function () {
      this.x = 10
      this.y = 10
      this.w = 150
      this.h = 150
    }
  }
}
</script>

<style>
  .vdr {
    border: 1px dashed black;
  }
</style>
