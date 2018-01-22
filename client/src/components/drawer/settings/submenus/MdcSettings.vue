<template>
<div>
  <menu-toggle menuHeader="General">
    <div class="menu menu--double-col">
      <mdc-textfield v-model="h" label="Height (px)" dense
        @input.native="e => emitChanges('height', e.target.value)"/>
      <mdc-textfield v-model="w" label="Width (px)" dense
        @input.native="e => emitChanges('width', e.target.value)"/>

      <mdc-textfield v-model="t" label="Top (px)" dense
        @input.native="e => emitChanges('top', e.target.value)"/>
      <mdc-textfield v-model="l" label="Left (px)" dense
        @input.native="e => emitChanges('left', e.target.value)"/>
    </div>

    <div class="menu menu--single-col">
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

  <menu-toggle menuHeader="Material theme">
    <div class="menu menu--single-col">
      <material-theme :primary="sty['--mdc-theme-primary']"
        :secondary="sty['--mdc-theme-secondary']"
        :background="sty['--mdc-theme-background']"
        @change="changeData => onStyleChanges(changeData.prop, changeData.value)">
      </material-theme>
    </div>
  </menu-toggle>
</div>
</template>


<script>
import cloneDeep from 'clone-deep'

import MenuToggle from '@/components/common/MenuToggle'
import Slider from './controls/Slider'
import StackOrder from './controls/StackOrder'
import MaterialTheme from './controls/MaterialTheme'

export default {
  name: 'mdc-settings',
  components: { MenuToggle, Slider, StackOrder, MaterialTheme },
  props: ['height', 'width', 'top', 'left', 'zIndex', 'styles', 'isMDC'],
  data: function () {
    return {
      h: this.height,
      w: this.width,
      t: this.top,
      l: this.left,
      z: this.zIndex,
      sty: cloneDeep(this.styles)
    }
  },
  watch: {
    'height' (val) { this.h = val.toString() },
    'width' (val) { this.w = val.toString() },
    'top' (val) { this.t = val.toString() },
    'left' (val) { this.l = val.toString() },
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
.menu {
  width: 100%;
  height: 100%;
  margin: 1px;
  margin-bottom: 10px;
  display: grid;
}
  .menu--single-col {
    grid-template-columns: repeat(1, 1fr);
  }
  .menu--double-col {
    grid-template-columns: repeat(2, 1fr);
  }
    .menu--double-col * {
      margin: 0 20px;
    }
</style>
