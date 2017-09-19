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
    <yolk :yolk="egg"></yolk>
  </vue-draggable-resizable>
</template>


<script>
import { mapMutations, mapGetters } from 'vuex'
import types from '@/store/types'
import Yolk from '@/components/Yolk'

export default {
  name: 'egglement',
  props: ['egg'],
  components: { Yolk },
  methods: mapMutations([
    types.resizeEgglement,
    types.moveEgglement
  ]),
  computed: {
    pageIndex () {
      return this.getPageIndexById(this.$route.query.page)
    },
    ...mapGetters([types.getPageIndexById])
  }
}
</script>
