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

      <!-- <color-picker label="Background color"
        icon="system/editor/bg_color"
        :color="sty['background-color']"
        @input="newColor => onStyleChanges('background-color', newColor)">
      </color-picker> -->

      <stack-order :zIndex="z"
        @change="newValue => emitChanges('zIndex', newValue)">
      </stack-order>
    </div>
  </menu-toggle>

  <!-- <menu-toggle menuHeader="Border">
    <div class="menu menu--single-col">
      <icon-select class="text-item" :value="borderSelected"
        :icon="'system/editor/border' + borderSelected" label="Border"
        @change="newValue => borderSelected = newValue"
      >
        <option value="">All borders</option>
        <option value="-top">Top</option>
        <option value="-bottom">Bottom</option>
        <option value="-left">Left</option>
        <option value="-right">Right</option>
      </icon-select>

      <slider label="Border radius"
        icon="system/editor/corner_radius"
        min="0" max="50" step="1"
        :value="parseInt(sty['border-radius']) || 0"
        @change="currentValue => onStyleChanges('border-radius', (currentValue + '%'))">
      </slider>

      <icon-select class="text-item"
        icon="system/editor/border_style" label="Style"
        :value="sty['border' + borderSelected + '-style'] || 'inherit'"
        @change="currentValue => onStyleChanges('border' + borderSelected + '-style', currentValue)"
      >
        <option value="none">none</option>
        <option value="dotted">dotted</option>
        <option value="dashed">dashed</option>
        <option value="solid">solid</option>
        <option value="double">double</option>
        <option value="groove">groove</option>
        <option value="ridge">ridge</option>
        <option value="inset">inset</option>
        <option value="outset">outset</option>
        <option value="inherit">inherit</option>
      </icon-select>

      <slider label="Border width"
        icon="system/editor/border_weight"
        min="0" max="25" step="1"
        :value="parseInt(sty['border' + borderSelected + '-width']) || 0"
        @change="currentValue => onStyleChanges('border' + borderSelected + '-width', (currentValue + 'px'))">
      </slider>

      <color-picker label="Border color"
        icon="system/editor/border_color"
        :color="sty['border' + borderSelected + '-color']"
        @input="newColor => onStyleChanges('border' + borderSelected + '-color', newColor)">
      </color-picker>
    </div>
  </menu-toggle> -->
</div>
</template>


<script>
import cloneDeep from 'clone-deep'

import MenuToggle from '@/components/common/MenuToggle'
import Slider from './controls/Slider'
import IconSelect from './controls/IconSelect'
import StackOrder from './controls/StackOrder'
import ColorPicker from './controls/ColorPicker'

export default {
  name: 'component-settings',
  components: { MenuToggle, Slider, StackOrder, ColorPicker, IconSelect },
  props: ['height', 'width', 'top', 'left', 'zIndex', 'styles'],
  data: function () {
    return {
      h: this.height,
      w: this.width,
      t: this.top,
      l: this.left,
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
    .menu--single-col .text-item {
      margin: 0 20px 10px;
    }
  .menu--double-col {
    grid-template-columns: repeat(2, 1fr);
  }
    .menu--double-col * {
      margin: 0 20px;
    }
</style>
