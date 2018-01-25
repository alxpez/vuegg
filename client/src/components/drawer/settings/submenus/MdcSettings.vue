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

  <menu-toggle menuHeader="Material props" :hidden="!Object.keys(att).length">
    <div class="menu menu--single-col">
      <div v-for="(item, key, index) in attrs" :key="key">
        <mdc-checkbox v-if="typeof item === 'boolean'"
          class="text-item"
          :label="key" v-model="att[key]"
          @change="onAttrsChanges(key, att[key])">
        </mdc-checkbox>

        <slider v-else-if="typeof item === 'number'"
          :label="key"
          class="text-item"
          min="1" max="100" step="1"
          :value="att[key] || 100"
          @change="currentValue => onAttrsChanges(key, currentValue)">
        </slider>

        <mdc-textfield v-else
          class="text-item"
          :label="key" v-model="att[key]" dense
          @input.native="e => onAttrsChanges(key, e.target.value)"/>
      </div>
    </div>
  </menu-toggle>

  <menu-toggle menuHeader="Text" :hidden="(typeof txt === 'undefined' || txt === null)">
    <div class="menu menu--single-col">
      <text-align @change="newValue => onStyleChanges('text-align', newValue)"
        :textAlign="sty['text-align']">
      </text-align>

      <font-style @change="changeData => onStyleChanges(changeData.prop, changeData.value)"
        :fontWeight="sty['font-weight']"
        :fontStyle="sty['font-style']"
        :textDecoration="sty['text-decoration']">
      </font-style>

      <slider label="Font size"
        icon="system/editor/font_size"
        min="1" max="100" step="1"
        :value="parseInt(sty['font-size']) || 16"
        @change="currentValue => onStyleChanges('font-size', (currentValue + 'px'))">
      </slider>

      <color-picker label="Text Color"
        icon="system/editor/text_color"
        :color="sty['color']"
        @input="newColor => onStyleChanges('color', newColor)">
      </color-picker>

      <icon-select class="text-item"
        icon="system/editor/font" label="Font family"
        :value="sty['font-family'] || 'Roboto, sans-serif'"
        @change="newValue => onStyleChanges('font-family', newValue)"
      >
        <optgroup v-for="fontFamily in fonts" :key="fontFamily.family" :label="fontFamily.family">
          <option v-for="font in fontFamily.fonts" :key="font.name" :value="font.definition">
            {{font.name}}
          </option>
        </optgroup>
      </icon-select>

      <mdc-textfield class="text-item" v-model="txt" label="Text" dense
        @input.native="e => emitChanges('text', e.target.value)"/>
    </div>
  </menu-toggle>
</div>
</template>


<script>
import cloneDeep from 'clone-deep'
import WebSafeFonts from '@/assets/WebSafeFonts'

import MenuToggle from '@/components/common/MenuToggle'
import Slider from './controls/Slider'
import IconSelect from './controls/IconSelect'
import ColorPicker from './controls/ColorPicker'
import StackOrder from './controls/StackOrder'
import TextAlign from './controls/TextAlign'
import FontStyle from './controls/FontStyle'
import MaterialTheme from './controls/MaterialTheme'

export default {
  name: 'mdc-settings',
  components: {
    MenuToggle,
    Slider,
    IconSelect,
    ColorPicker,
    StackOrder,
    TextAlign,
    FontStyle,
    MaterialTheme
  },
  props: ['height', 'width', 'top', 'left', 'zIndex', 'text', 'styles', 'attrs'],
  data: function () {
    return {
      h: this.height,
      w: this.width,
      t: this.top,
      l: this.left,
      z: this.zIndex,
      txt: this.text,
      sty: cloneDeep(this.styles),
      att: cloneDeep(this.attrs),
      fonts: WebSafeFonts
    }
  },
  watch: {
    'height' (val) { this.h = val.toString() },
    'width' (val) { this.w = val.toString() },
    'top' (val) { this.t = val.toString() },
    'left' (val) { this.l = val.toString() },
    'zIndex' (val) { this.z = val },
    'text' (val) { this.txt = val },
    'styles' (val) { this.sty = cloneDeep(val) },
    'attrs' (val) { this.att = cloneDeep(val) }
  },
  methods: {
    onStyleChanges (prop, value) {
      this.sty[prop] = value
      this.emitChanges('styles', this.sty)
    },

    onAttrsChanges (prop, value) {
      this.att[prop] = value
      this.emitChanges('attrs', this.att)
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
      display: flex;
    }
  .menu--double-col {
    grid-template-columns: repeat(2, 1fr);
  }
    .menu--double-col * {
      margin: 0 20px;
    }
</style>
