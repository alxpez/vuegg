<template>
  <div class="color-pick" @mouseleave="isMouseOut = true" @mouseenter="isMouseOut = false">
    <div class="color-pick__anchor"  @click.capture="togglePicker">
      <div class="anchor__color-display" :style="anchorStyle"></div>
      <span class="anchor__title">{{title}}</span>
    </div>
    <color-chrome class="color-pick__menu" v-show="isPickerOpen"
      :value="color" @input="newColor => $emit('input', newColor)">
    </color-chrome>
  </div>
</template>


<script>
import tinycolor from 'tinycolor2'
import { Chrome } from 'vue-color'

export default {
  name: 'color-pick',
  props: {
    color: {
      type: Object,
      default: {r: 0, g: 0, b: 0, a: 1}
    },
    title: {
      type: String,
      default: ''
    }
  },
  components: { 'color-chrome': Chrome },
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
  created: function () {
    document.documentElement.addEventListener('click', this.onDocumentClick, true)
  },
  beforeDestory: function () {
    document.documentElement.removeEventListener('click', this.onDocumentClick, true)
  },
  methods: {
    togglePicker () {
      this.isPickerOpen = !this.isPickerOpen
    },

    onDocumentClick () {
      if (this.isPickerOpen && this.isMouseOut) this.isPickerOpen = false
    }
  }
}
</script>


<style scoped>
.color-pick {
  width: 100%;
}

.color-pick__anchor {
  display: inline-flex;
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

.color-pick__menu {
  left: 8px;
  position: absolute;
  z-index: 10;
}
</style>
