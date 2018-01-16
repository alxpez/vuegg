<!-- TODO: This component is getting quite big > divide settingsMenu into submenus components -->

<template>
  <div class="menus-wrapper">
    <span class="selection-title">{{selectionTitle}}</span>
    <menu-toggle :menuHeader="'Dimensions'" :hidden="!showDimensionSettings" >
      <div class="menu dimension-menu">
        <mdc-textfield v-model="height" @blur="e => onPropChange(e, 'height')" label="Height (px)" class="mini-text-input" dense/>
        <mdc-textfield v-model="width"  @blur="e => onPropChange(e, 'width')" label="Width (px)" class="mini-text-input" dense/>
      </div>
    </menu-toggle>

    <menu-toggle :menuHeader="'Position'" :hidden="selectionType === 'page'">
      <div class="menu position-menu">
        <mdc-textfield v-model="top" @blur="e => onPropChange(e, 'top')" label="Top (px)" class="mini-text-input" dense/>
        <mdc-textfield v-model="left"  @blur="e => onPropChange(e, 'left')" label="Left (px)" class="mini-text-input" dense/>
      </div>
    </menu-toggle>

    <menu-toggle :menuHeader="'Image properties'" :hidden="!showImageSettings">
      <div class="menu image-menu">
        <mdc-textfield v-model="attrs.src" @blur="e => onPropChange(e, 'attrs')" label="Image source" class="text-input" dense/>
      </div>
    </menu-toggle>

    <menu-toggle :menuHeader="'Text properties'" :startClosed="false" :hidden="!showTextSettings">
      <div class="menu text-menu">
        <div class="icon-bar">
          <svgicon icon="system/editor/align_left" width="22" height="22"
            @click.native="onToggleProp('text-align', 'left', isAlignedLeft)"
            :color="isAlignedLeft ? 'rgba(0,0,0,.87)' : 'rgba(0,0,0,.38)'">
          </svgicon>
          <svgicon icon="system/editor/align_right" width="22" height="22"
            @click.native="onToggleProp('text-align', 'right', isAlignedRight)"
            :color="isAlignedRight ? 'rgba(0,0,0,.87)' : 'rgba(0,0,0,.38)'">
          </svgicon>
          <svgicon icon="system/editor/align_center" width="22" height="22"
            @click.native="onToggleProp('text-align', 'center', isCentered)"
            :color="isCentered ? 'rgba(0,0,0,.87)' : 'rgba(0,0,0,.38)'">
          </svgicon>
          <svgicon icon="system/editor/align_justify" width="22" height="22"
            @click.native="onToggleProp('text-align', 'justify', isJustified)"
            :color="isJustified ?'rgba(0,0,0,.87)' : 'rgba(0,0,0,.38)'">
          </svgicon>
        </div>

        <div class="icon-bar">
          <svgicon icon="system/editor/bold" width="22" height="22"
            @click.native="onToggleProp('font-weight', 'bold', isBold)"
            :color="isBold ? 'rgba(0,0,0,.87)' : 'rgba(0,0,0,.38)'">
          </svgicon>
          <svgicon icon="system/editor/italic" width="22" height="22"
            @click.native="onToggleProp('font-style', 'italic', isItalic)"
            :color="isItalic ? 'rgba(0,0,0,.87)' : 'rgba(0,0,0,.38)'">
          </svgicon>
          <svgicon icon="system/editor/underline" width="22" height="22"
            @click.native="onToggleProp('text-decoration', 'underline', isUnderlined)"
            :color="isUnderlined ? 'rgba(0,0,0,.87)' : 'rgba(0,0,0,.38)'">
          </svgicon>
          <svgicon icon="system/editor/strikethrough" width="22" height="22"
            @click.native="onToggleProp('text-decoration', 'line-through', isStriked)"
            :color="isStriked ? 'rgba(0,0,0,.87)' : 'rgba(0,0,0,.38)'">
          </svgicon>
        </div>

        <material-select class="select-wrapper" label="Font family">
          <select v-model="styles['font-family']" @change="e => onPropChange(e, 'styles')">
            <optgroup v-for="fontFamily in webSafeFonts" :key="fontFamily.family" :label="fontFamily.family">
              <option v-for="font in fontFamily.fonts" :key="font.name" :value="font.definition">
                {{font.name}}
              </option>
            </optgroup>
          </select>
        </material-select>

        <mdc-textfield v-model="attrs.value" v-if="(typeof attrs.value !== 'undefined' && attrs.value !== null)"
          @blur="e => onPropChange(e, 'attrs')" label="Text" class="text-input" dense/>
        <mdc-textfield v-model="text" v-else
          @blur="e => onPropChange(e, 'text')"label="Text" class="text-input" dense/>

        <color-chrome :value="formattedColor" @input="newColor => onColorChange(newColor, 'color')"></color-chrome>
      </div>
    </menu-toggle>

    <menu-toggle :menuHeader="'Background Color'" :startClosed="true" :hidden="!showColorSettings">
      <div class="menu color-menu">
        <color-chrome :value="formattedBackgroundColor" @input="newColor => onColorChange(newColor, 'background-color')"></color-chrome>
      </div>
    </menu-toggle>
  </div>
</template>


<script>
import cloneDeep from 'clone-deep'
import { mapState, mapMutations } from 'vuex'
import { updatePage, updateEgglement } from '@/store/types'

import { Chrome } from 'vue-color'
import tinycolor from 'tinycolor2'

import MenuToggle from '@/components/common/MenuToggle'
import MaterialSelect from '@/components/common/MaterialSelect'

import WebSafeFonts from '@/assets/WebSafeFonts'
import '@/assets/icons/system/editor/'

export default {
  name: 'settings-menu',
  components: { MenuToggle, MaterialSelect, 'color-chrome': Chrome },
  data: function () {
    return {
      name: null,
      path: null,
      text: null,
      height: null,
      width: null,
      top: null,
      left: null,
      attrs: {},
      styles: {},
      classes: {},
      defaultColor: {rgba: {r: 0, g: 0, b: 0, a: 1}, a: 1},
      webSafeFonts: WebSafeFonts
    }
  },
  computed: {
    selectionType () {
      return (this.selectedElements.length === 0)
        ? 'page'
        : (this.selectedElements.length > 1)
          ? 'multiple'
          : 'single'
    },
    selectionTitle () {
      return (this.selectedElements.length === 0)
        ? 'PAGE'
        : (this.selectedElements.length > 1)
          ? 'MULTIPLE'
          : this.selectedElements[0].name.toUpperCase()
    },
    selectedItem () {
      return (this.selectedElements.length === 0)
        ? this.activePage
        : (this.selectedElements.length > 1)
          ? this.selectedElements
          : this.selectedElements[0]
    },

    formattedBackgroundColor () {
      return (this.styles['background-color']) ? tinycolor(this.styles['background-color']).toRgb() : this.defaultColor
    },
    formattedColor () {
      return (this.styles && this.styles.color) ? tinycolor(this.styles.color).toRgb() : this.defaultColor
    },

    hasGlobalComponents () {
      return (this.selectedElements.length > 0)
        ? (this.selectedElements.findIndex(el => el.global === true) !== -1)
        : false
    },
    isExternal () {
      return (this.selectedElements.length > 0)
        ? (this.selectedElements.findIndex(el => el.external === true) !== -1)
        : false
    },

    // --- Toggle menus visibility settings --- //
    isAlignedLeft () { return (this.styles['text-align'] === 'left') },
    isAlignedRight () { return (this.styles['text-align'] === 'right') },
    isCentered () { return (this.styles['text-align'] === 'center') },
    isJustified () { return (this.styles['text-align'] === 'justify') },

    isBold () { return (this.styles['font-weight'] === 'bold') },
    isItalic () { return (this.styles['font-style'] === 'italic') },
    isUnderlined () { return (this.styles['text-decoration'] === 'underline') },
    isStriked () { return (this.styles['text-decoration'] === 'line-through') },

    // --- Visibility menus settings --- //
    showDimensionSettings () {
      return (!this.hasGlobalComponents)
    },
    showColorSettings () {
      return ((this.selectionType !== 'multiple') && (!this.hasGlobalComponents))
    },
    showTextSettings () {
      return ((this.selectionType !== 'multiple') && (this.selectionType !== 'page') && (!this.hasGlobalComponents) &&
              (this.text !== null || (typeof this.attrs.value !== 'undefined' && this.attrs.value !== null)))
    },
    showImageSettings () {
      return ((this.selectionType !== 'multiple') && (this.selectionType !== 'page') && (!this.hasGlobalComponents) &&
              (typeof this.attrs.src !== 'undefined' && this.attrs.src !== null))
    },

    ...mapState({
      activePage: state => state.app.selectedPage,
      selectedElements: state => state.app.selectedElements
    })
  },
  methods: {
    onColorChange (newColor, prop) {
      this.styles[prop] = tinycolor(newColor.hsl).toRgbString()
      this.saveChanges({styles: cloneDeep(this.styles)})
    },

    onToggleProp (prop, val, isOn) {
      this.styles[prop] = isOn ? 'inherit' : val
      this.saveChanges({styles: cloneDeep(this.styles)})

      // Necessary rebase for reactivity purposes
      this.styles = cloneDeep(this.styles)
    },

    onPropChange (e, prop) {
      if (e.target.value === '') return
      let newValue = {}

      if (prop === 'attrs') {
        newValue['attrs'] = cloneDeep(this.attrs)
      } else if (prop === 'styles') {
        newValue['styles'] = cloneDeep(this.styles)
      } else if (prop === 'classes') {
        newValue['classes'] = cloneDeep(this.classes)
      } else if (prop === 'height' || prop === 'width') {
        newValue[prop] = (e.target.value.indexOf('%') !== -1) ? e.target.value : parseInt(e.target.value)
      } else if (prop === 'top' || prop === 'left') {
        newValue[prop] = parseInt(e.target.value)
      } else {
        newValue[prop] = e.target.value
      }

      this.saveChanges(newValue)
    },

    saveChanges (newValue) {
      if (this.selectionType === 'page') {
        this.updatePage({page: this.activePage, ...newValue})
      } else if (this.selectionType === 'multiple') {
        this.selectedItem.map(egglement => this.updateEgglement({egglement, ...newValue}))
      } else {
        this.updateEgglement({egglement: this.selectedItem, ...newValue})
      }
    },

    ...mapMutations([updatePage, updateEgglement])
  },
  watch: {
    'selectedItem': function (val) {
      if (Array.isArray(val)) {
        this.name = null
        this.path = null
        this.text = null
        this.top = null
        this.left = null
        this.height = null
        this.width = null
        this.attrs = {}
        this.styles = {}
        this.classes = {}
      } else {
        this.name = (val.name) ? val.name : null
        this.path = (val.path) ? val.path : null
        this.text = (val.text) ? val.text : null
        this.height = (typeof val.height !== 'undefined' && val.height !== null) ? val.height.toString() : null
        this.width = (typeof val.width !== 'undefined' && val.width !== null) ? val.width.toString() : null
        this.top = (typeof val.top !== 'undefined' && val.top !== null) ? val.top.toString() : null
        this.left = (typeof val.left !== 'undefined' && val.left !== null) ? val.left.toString() : null
        this.attrs = (val.attrs) ? cloneDeep(val.attrs) : {}
        this.styles = (val.styles) ? cloneDeep(val.styles) : {}
        this.classes = (val.classes) ? cloneDeep(val.classes) : {}
      }
    }
  }
}
</script>


<style scoped>
.menus-wrapper {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  height: calc(100% - 58px);
  width: 100%;
  position: absolute;
  overflow-y: auto;
}

.selection-title {
  user-select: none;
  text-align: center;
  padding: 9px 0;
  background-color: #ffffff;
  border-bottom: 1px solid rgba(0,0,0,0.12);
}

.menu {
  width: 100%;
  height: 100%;
  margin: 1px;
  margin-bottom: 10px;
  display: grid;
}
  .dimension-menu, .position-menu {
    grid-template-columns: repeat(2, 1fr);
  }
  .text-menu, .color-menu, .image-menu {
    grid-template-columns: repeat(1, 1fr);
  }

.select-wrapper {
  margin: 0 20px 10px;
}
.icon-bar {
  user-select: none;
  text-align: center;
  margin: 16px 0 4px;
}
.icon-bar svg {
  margin: 0 16px;
  cursor: pointer;
}

.vc-chrome {
  background: transparent;
  background-color: transparent;
  box-shadow: none;
  margin: auto;
}

.text-input {
  margin: 0 20px 10px;
}

.mini-text-input {
  margin: 0 20px;
}

</style>
