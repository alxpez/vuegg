<template>
  <div class="canvas">
    <h1>Build shit with this components</h1>
    <vue-draggable-resizable v-for="el in elements" :key="el.id"
      :w="el.width" :h="el.height" :x="el.x" :y="el.y" :parent="true"
      @resizestop="(x, y, width, height)=>RESIZE_ELEMENT({id:el.id, x, y, width, height})"
      @dragstop="(x, y)=>MOVE_ELEMENT({id:el.id, x, y})">
      <component v-if="el.parent" class="dnd" :is="el.parent.type" v-bind="el.parent.props">
        <component class="dnd" :is="el.type" v-bind="el.props">
          {{ el.name }}
        </component>
      </component>
      <component v-else class="dnd" :is="el.type">
        {{ el.name }}
      </component>
    </vue-draggable-resizable>
    <a href="#/edit">Edit</a>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import types from '@/store/mutation-types'

export default {
  computed: mapState(['elements']),
  methods: mapMutations([types.RESIZE_ELEMENT, types.MOVE_ELEMENT])
}
</script>

<style scoped>
.canvas {
  top: 70px;
  border: solid;
  border-width: thin;
  width: 1024px;
  height: 1000px;
}

.dnd {
  width: 100%;
  height: 100%;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
