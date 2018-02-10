<template>
<div>
  <menu-toggle menuHeader="General">
    <dim-pos :height="h" :width="w" :top="t" :bottom="b" :left="l" :right="r"
      @change="({type, value}) => emitChanges(type, value)">
    </dim-pos>

    <div class="menu">
      <slider label="Opacity"
        icon="system/editor/opacity"
        min="0" max="100" step="1"
        :value="sty['opacity'] * 100 || 100"
        @change="currentValue => onStyleChanges('opacity', currentValue / 100)">
      </slider>

      <color-picker label="Background color"
        icon="system/editor/bg_color"
        :color="sty['background-color']"
        @input="newColor => onStyleChanges('background-color', newColor)">
      </color-picker>

      <stack-order :zIndex="z"
        @change="newValue => emitChanges('zIndex', newValue)">
      </stack-order>
    </div>
  </menu-toggle>

  <menu-toggle menuHeader="Text" :hidden="hideTextSettings">
    <div class="menu">
      <text-align @change="newValue => onStyleChanges('text-align', newValue)"
        :textAlign="sty['text-align']">
      </text-align>

      <font-style @change="({prop, value}) => onStyleChanges(prop, value)"
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

      <mdc-textfield class="text-item" v-model="att.value" label="Text" dense
        v-if="(typeof att.value !== 'undefined' && att.value !== null)"
        @keyup.native="e => onAttrsChanges('value', e.target.value)"/>
      <mdc-textfield class="text-item" v-model="txt" label="Text" dense v-else
        @keyup.native="e => emitChanges('text', e.target.value)"/>
    </div>
  </menu-toggle>

  <menu-toggle menuHeader="Placeholder" :hidden="(typeof att.placeholder === 'undefined' || att.placeholder === null)">
    <div class="menu">
      <mdc-textfield class="text-item" v-model="att.placeholder" label="Placeholder" dense
        @keyup.native="e => onAttrsChanges('placeholder', e.target.value)"/>
    </div>
  </menu-toggle>

  <menu-toggle menuHeader="Image" :hidden="(typeof att.src === 'undefined' || att.src === null)">
    <div class="menu">
      <mdc-textfield class="text-item" v-model="att.src" label="Image URL" dense
        @keyup.native="e => onAttrsChanges('src', e.target.value)"/>
    </div>
  </menu-toggle>

  <menu-toggle menuHeader="Border">
    <div class="menu">
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
        @change="currentValue => onStyleChanges('border-radius', (currentValue + 'px'))">
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
  </menu-toggle>
</div>
</template>


<script>
import cloneDeep from 'clone-deep'
import WebSafeFonts from '@/assets/WebSafeFonts'

import MenuToggle from '@/components/editor/common/MenuToggle'
import Slider from './controls/Slider'
import IconSelect from './controls/IconSelect'
import ColorPicker from './controls/ColorPicker'
import StackOrder from './controls/StackOrder'
import TextAlign from './controls/TextAlign'
import FontStyle from './controls/FontStyle'
import DimPos from './controls/DimPos'

export default {
  name: 'element-settings',
  components: { MenuToggle, Slider, IconSelect, ColorPicker, StackOrder, TextAlign, FontStyle, DimPos },
  props: ['height', 'width', 'top', 'left', 'bottom', 'right', 'zIndex', 'text', 'styles', 'attrs'],
  data: function () {
    return {
      h: this.height,
      w: this.width,
      t: this.top,
      l: this.left,
      b: this.bottom,
      r: this.right,
      z: this.zIndex,
      txt: this.text,
      sty: cloneDeep(this.styles),
      att: cloneDeep(this.attrs),
      fonts: WebSafeFonts,
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
    'text' (val) { this.txt = val },
    'styles' (val) { this.sty = cloneDeep(val) },
    'attrs' (val) { this.att = cloneDeep(val) }
  },
  computed: {
    hideTextSettings () {
      return (typeof this.txt === 'undefined' || this.txt === null) &&
        (typeof this.att.value === 'undefined' || this.att.value === null)
    }
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
.menu{
  width: 100%;
  height: 100%;
  margin: 1px;
  margin-bottom: 10px;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
}
  .menu .text-item {
    margin: 0 20px 10px;
  }
</style>
