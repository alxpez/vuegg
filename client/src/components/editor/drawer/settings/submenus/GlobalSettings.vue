<template>
<div>
  <menu-toggle menuHeader="General">
    <dim-pos :top="t" :bottom="b" :left="l" :right="r" :hasDim="false"
      @change="({type, value}) => emitChanges(type, value)">
    </dim-pos>

    <div class="menu">
      <stack-order :zIndex="z"
        @change="newValue => emitChanges('zIndex', newValue)">
      </stack-order>
    </div>
  </menu-toggle>
</div>
</template>


<script>
import MenuToggle from '@/components/editor/common/MenuToggle'
import StackOrder from './controls/StackOrder'
import DimPos from './controls/DimPos'

export default {
  name: 'global-settings',
  components: { MenuToggle, StackOrder, DimPos },
  props: ['top', 'left', 'bottom', 'right', 'zIndex'],
  data: function () {
    return {
      t: this.top,
      l: this.left,
      b: this.bottom,
      r: this.right,
      z: this.zIndex
    }
  },
  watch: {
    'top' (val) { this.t = val.toString() },
    'left' (val) { this.l = val.toString() },
    'bottom' (val) { this.b = val.toString() },
    'right' (val) { this.r = val.toString() },
    'zIndex' (val) { this.z = val }
  },
  methods: {
    emitChanges (type, value) {
      this.$emit('propchange', {type, value})
    }
  }
}
</script>


<style scoped>
.menu{
  width: 100%;
  height: 100%;
  margin: 1px;
  margin-bottom: 10px;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
}
</style>
