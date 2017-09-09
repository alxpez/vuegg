<template>
  <div>
    <h1>Build shit with this components</h1>
    <vue-draggable-resizable v-for="el in elements" :key="el.id"
      :w="el.width" :h="el.height" :parent="false"
      @resizing="(x, y, width, height)=>RESIZE_ELEMENT({el, x, y, width, height})"
      @dragging="(x, y)=>MOVE_ELEMENT({el, x, y})">
      <div>
        {{ el.code }}
      </div>
    </vue-draggable-resizable>
    <a href="#/edit">Edit</a>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { RESIZE_ELEMENT, MOVE_ELEMENT } from '../mutation-types'

export default {
  // computed: {
  //   children () {
  //     return this.$store.state.children
  //   }
  // }
  computed: mapState(['elements']),
  methods: mapMutations([RESIZE_ELEMENT, MOVE_ELEMENT])
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
