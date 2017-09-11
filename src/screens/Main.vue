<template>
  <div class="canvas">
    <h1>Build shit with this components</h1>

    <!-- TODO: move the below logic to a component ... and implement recursive creation of elements, for fuck sake-->
    <vue-draggable-resizable v-for="el in elements" :key="el.id" :parent="true"
      :w="el.width" :minw="el.minWidth" :h="el.height" :minh="el.minHeight" :x="el.x" :y="el.y"
      @resizestop="(x, y, width, height)=>RESIZE_ELEMENT({id:el.id, x, y, width, height})"
      @dragstop="(x, y)=>MOVE_ELEMENT({id:el.id, x, y})">
      <!-- Some elements need a wrapper, that's the "why" of the parent. Is it? -->
      <component v-if="el.parent" class="dnd":class="[el.colorClass, el.depthClass, el.shapeClass]" :is="el.parent.type" v-bind="el.parent.props">
        <!-- Only elements inside a wrapper can have sibilings. Is that right? -->
        <component v-if="el.sibilings && el.sibilings.lenght>0" v-for="sib in el.sibilings" :key="sib.id" :is="sib.type">
          {{sib.children[0].text}}
        </component>
        <component class="dnd" :class="[el.colorClass, el.depthClass, el.shapeClass]" :is="el.type" v-bind="el.props"/>
      </component>
      <!-- Elements w/o wrapper, live only for their kids -->
      <component v-else class="dnd" :class="[el.colorClass, el.depthClass, el.shapeClass]" v-bind="el.props" :is="el.type">
        {{el.children[0].text}}
      </component>
    </vue-draggable-resizable>
    <!-- END :TODO -->
    
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
  margin: 0;
  padding: 0;
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
