<template>
  <div>
    <h1>Build shit with this components</h1>
    <vue-draggable-resizable v-for="el in elements" :key="el.id"
      :w="el.width" :h="el.height" :parent="false"
      @resizestop="(x, y, width, height)=>RESIZE_ELEMENT({id:el.id, x, y, width, height})"
      @dragstop="(x, y)=>MOVE_ELEMENT({id:el.id, x, y})">
      <component class="dnd" :is="el.type">
        {{ el.name }}
      </component>
    </vue-draggable-resizable>
    <a href="#/edit">Edit</a>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { RESIZE_ELEMENT, MOVE_ELEMENT } from '../mutation-types'

export default {
  computed: mapState(['elements']),
  methods: mapMutations([RESIZE_ELEMENT, MOVE_ELEMENT])
}
</script>

<style scoped>
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
