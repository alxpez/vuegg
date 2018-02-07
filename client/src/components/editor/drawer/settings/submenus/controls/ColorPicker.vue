<template>
  <div class="color-picker__wrapper" @mouseleave="isMouseOut = true" @mouseenter="isMouseOut = false">
    <div class="color-picker">
      <div class="color-picker__anchor"  @click.capture="togglePicker">
        <div class="anchor__color-display" :style="anchorStyle"></div>
        <span class="anchor__title" v-show="(label !== '')">{{label}}</span>
      </div>
      <color-chrome class="color-picker__menu" v-show="isPickerOpen"
        :value="color" @input="newColor => onColorChange(newColor)">
      </color-chrome>
    </div>
    <svgicon v-show="(icon !== '')" :icon="icon" width="22" height="22" color="rgba(0,0,0,.87)"></svgicon>
  </div>
</template>


<script>
import tinycolor from 'tinycolor2'
import { Chrome } from 'vue-color'

export default {
  name: 'color-picker',
  components: { 'color-chrome': Chrome },
  props: {
    color: {type: String, default: '#000000'},
    label: {type: String, default: ''},
    icon: {type: String, default: ''}
  },
  data: function () {
    return {
      isPickerOpen: false,
      isMouseOut: false
    }
  },
  computed: {
    anchorStyle () {
      return {
        'background-color': tinycolor(this.color).toRgbString()
      }
    }
  },
  methods: {
    togglePicker () {
      this.isPickerOpen = !this.isPickerOpen
    },

    onColorChange (newColor) {
      this.$emit('input', tinycolor(newColor.hsl).toRgbString())
    },

    onDocumentClick () {
      if (this.isMouseOut) this.isPickerOpen = false
    }
  },
  watch: {
    'isPickerOpen': function (val) {
      (val === true)
        ? document.documentElement.addEventListener('click', this.onDocumentClick, true)
        : document.documentElement.removeEventListener('click', this.onDocumentClick, true)
    }
  }
}
</script>


<style scoped>
.color-picker {
  width: 100%;
}

.color-picker__wrapper {
  display: inline-flex;
  margin: 16px 20px 8px;
}

.color-picker__anchor {
  display: inline-flex;
  width: 100%;
}
  .anchor__color-display {
    cursor: pointer;
    height: 22px;
    width: 22px;
    border-radius: 50%;
    border: 1px solid rgba(0,0,0,0.12)
  }
  .anchor__title {
    margin: 5px 0 0 8px;
    font-size: .813rem;
    color: rgba(0, 0, 0, 0.57);
    cursor: pointer;
}

.color-picker__menu {
  left: 8px;
  position: absolute;
  z-index: 10;
}
</style>
