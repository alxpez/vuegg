<template>
  <vue-draggable-resizable
    :parent="true"
    :x="egg.x"
    :y="egg.y"
    :w="egg.width"
    :minw="egg.minWidth"
    :h="egg.height"
    :minh="egg.minHeight"
    @dragstop="(x, y)=>MOVE_ELEMENT({elId:egg.id, pageIndex, x, y})"
    @resizestop="(x, y, width, height)=>RESIZE_ELEMENT({elId:egg.id, pageIndex, x, y, width, height})"
  >
    <yolk :yolk="egg"></yolk>
  </vue-draggable-resizable>
</template>


<script>
import { mapMutations, mapGetters } from 'vuex'
import types from '@/store/mutation-types'
import Yolk from '@/components/Yolk'

export default {
  name: 'egglement',
  props: ['egg'],
  components: { Yolk },
  methods: mapMutations([types.RESIZE_ELEMENT, types.MOVE_ELEMENT]),
  computed: {
    pageIndex () {
      return this.getPageIndexById(this.$route.query.page)
    },
    ...mapGetters(['getPageIndexById'])
  }
}
</script>
