<template>
<div>
  <menu-toggle menuHeader="General">
    <dim-pos :height="h" :width="w" :hasPos="false"
      @change="({type, value}) => emitChanges(type, value)">
    </dim-pos>

    <div class="menu">
      <slider label="Opacity"
        icon="system/editor/opacity"
        min="0" max="1"
        :value="sty['opacity'] || 1"
        @change="currentValue => onStyleChanges('opacity', currentValue)">
      </slider>

      <color-picker label="Background color"
        icon="system/editor/bg_color"
        :color="sty['background-color']"
        @input="newColor => onStyleChanges('background-color', newColor)">
      </color-picker>
    </div>
  </menu-toggle>

  <menu-toggle menuHeader="Material theme">
    <div class="menu">
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

import Slider from './controls/Slider'
import ColorPicker from './controls/ColorPicker'
import MaterialTheme from './controls/MaterialTheme'
import MenuToggle from '@/components/editor/common/MenuToggle'
import DimPos from './controls/DimPos'

export default {
  name: 'page-settings',
  components: { Slider, ColorPicker, MaterialTheme, MenuToggle, DimPos },
  props: ['height', 'width', 'styles'],
  data: function () {
    return {
      h: this.height,
      w: this.width,
      sty: cloneDeep(this.styles)
    }
  },
  watch: {
    'height' (val) { this.h = val.toString() },
    'width' (val) { this.w = val.toString() },
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
