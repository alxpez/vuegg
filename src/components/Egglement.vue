<template>
  <vue-draggable-resizable
    :parent="true"
    :x="egg.x"
    :y="egg.y"
    :w="egg.width"
    :h="egg.height"
    :minw="egg.minWidth"
    :minh="egg.minHeight"
    @dragstop="(x, y)=>moveEgglement({elId:egg.id, pageIndex, x, y})"
    @resizestop="(x, y, width, height)=>resizeEgglement({elId:egg.id, pageIndex, x, y, width, height})"
  >
    <component :class="[egg.classes, {egglement: egg.egg}]" :style="egg.styles" v-bind="egg.props" :is="egg.type">
      {{ egg.text }}
      <component v-if="hasChildren"
        v-for="child in egg.children"
        :key="child.id"
        v-bind="childProps(child)"
        :is="childType(child)"
      >
        {{ child.text }}
      </component>
    </component>
  </vue-draggable-resizable>
</template>


<script>
import { mapMutations, mapGetters } from 'vuex'
import { resizeEgglement, moveEgglement, getPageIndexById } from '@/store/types'

export default {
  name: 'egglement',
  props: ['egg'],
  computed: {
    pageIndex () {
      return this.getPageIndexById(this.$route.query.page)
    },
    hasChildren () {
      return (this.egg.children && this.egg.children.length > 0)
    },
    ...mapGetters([getPageIndexById])
  },
  methods: {
    childType (child) {
      return child.egg ? 'egglement' : child.type
    },
    childProps (child) {
      return child.egg ? { egg: child } : [child.props, {style: child.styles}, {class: child.classes}]
    },
    ...mapMutations([resizeEgglement, moveEgglement])
  }
}
</script>


<style scoped>
.egglement {
  margin: 0;
  width: 100%;
  height: 100%;
}
</style>
