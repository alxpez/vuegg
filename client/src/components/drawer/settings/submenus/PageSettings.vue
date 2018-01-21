<template>
<menu-toggle menuHeader="General">
  <div class="menu menu--double-col">
    <mdc-textfield v-model="h" label="Height (px)" dense
      @input.native="e => emitChanges('height', e.target.value)"/>
    <mdc-textfield v-model="w" label="Width (px)" dense
      @input.native="e => emitChanges('width', e.target.value)"/>
  </div>

  <div class="menu menu--single-col">
    <slider label="Opacity"
      icon="system/editor/opacity"
      min="0" max="1"
      :value="s['opacity'] || 1"
      @change="currentValue => onStyleChanges('opacity', currentValue)">
    </slider>

    <color-picker label="Background color"
      icon="system/editor/bg_color"
      :color="s['background-color']"
      @input="newColor => onStyleChanges('background-color', newColor)">
    </color-picker>
  </div>
</menu-toggle>
</template>


<script>
import cloneDeep from 'clone-deep'

import Slider from './controls/Slider'
import ColorPicker from './controls/ColorPicker'
import MenuToggle from '@/components/common/MenuToggle'

export default {
  name: 'page-settings',
  components: { Slider, ColorPicker, MenuToggle },
  props: ['height', 'width', 'styles'],
  data: function () {
    return {
      h: this.height,
      w: this.width,
      s: cloneDeep(this.styles)
    }
  },
  watch: {
    'height' (val) { this.h = val.toString() },
    'width' (val) { this.w = val.toString() },
    'styles' (val) { this.s = cloneDeep(val) }
  },
  methods: {
    onStyleChanges (prop, value) {
      this.s[prop] = value
      this.emitChanges('styles', this.s)
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
