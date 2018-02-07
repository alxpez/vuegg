<template>
<div>
  <menu-toggle menuHeader="General">
    <dim-pos :height="h" :width="w" :top="t" :bottom="b" :left="l" :right="r"
      @change="({type, value}) => emitChanges(type, value)">
    </dim-pos>

    <div class="menu">
      <slider label="Opacity"
        icon="system/editor/opacity"
        min="0" max="1"
        :value="sty['opacity'] || 1"
        @change="currentValue => onStyleChanges('opacity', currentValue)">
      </slider>

      <stack-order :zIndex="z"
        @change="newValue => emitChanges('zIndex', newValue)">
      </stack-order>
    </div>
  </menu-toggle>
</div>
</template>


<script>
import cloneDeep from 'clone-deep'

import MenuToggle from '@/components/editor/common/MenuToggle'
import Slider from './controls/Slider'
import StackOrder from './controls/StackOrder'
import DimPos from './controls/DimPos'

export default {
  name: 'component-settings',
  components: { MenuToggle, Slider, StackOrder, DimPos },
  props: ['height', 'width', 'top', 'left', 'bottom', 'right', 'zIndex', 'styles'],
  data: function () {
    return {
      h: this.height,
      w: this.width,
      t: this.top,
      l: this.left,
      b: this.bottom,
      r: this.right,
      z: this.zIndex,
      sty: cloneDeep(this.styles),
      borderSelected: ''
    }
  },
  watch: {
    'height' (val) { this.h = val.toString() },
    'width' (val) { this.w = val.toString() },
    'top' (val) { this.t = val.toString() },
    'left' (val) { this.l = val.toString() },
    'bottom' (val) { this.b = val.toString() },
    'right' (val) { this.r = val.toString() },
    'zIndex' (val) { this.z = val },
    'styles' (val) { this.sty = cloneDeep(val) }
  },
  methods: {
    onStyleChanges (prop, value) {
      this.sty[prop] = value
      this.emitChanges('styles', this.sty)
    },

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
