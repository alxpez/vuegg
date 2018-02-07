<template>
  <div class="material-theme__wrapper">
    <div class="material-theme">
      <svgicon icon="system/editor/reset_color" width="22" height="22"
        @click.native="$emit('change', {prop: '--mdc-theme-primary', value: 'inherit'})">
      </svgicon>
      <color-picker label="Primary color"
        icon="system/editor/color"
        :color="primary" class="material-theme__color-picker"
        @input="newColor => $emit('change', {prop: '--mdc-theme-primary', value: newColor})">
      </color-picker>
    </div>

    <div class="material-theme">
      <svgicon icon="system/editor/reset_color" width="22" height="22"
        @click.native="$emit('change', {prop: '--mdc-theme-secondary', value: 'inherit'})">
      </svgicon>
      <color-picker label="Secondary color"
        icon="system/editor/color_2"
        :color="secondary" class="material-theme__color-picker"
        @input="newColor => $emit('change', {prop: '--mdc-theme-secondary', value: newColor})">
      </color-picker>
    </div>

    <div class="material-theme">
      <svgicon icon="system/editor/reset_color" width="22" height="22"
        @click.native="$emit('change', {prop: '--mdc-theme-background', value: 'inherit'})">
      </svgicon>
      <color-picker label="Background color"
        icon="system/editor/bg_color"
        :color="background" class="material-theme__color-picker"
        @input="newColor => $emit('change', {prop: '--mdc-theme-background', value: newColor})">
      </color-picker>
    </div>
  </div>
</template>


<script>
import ColorPicker from './ColorPicker'

export default {
  name: 'material-theme',
  components: { ColorPicker },
  props: ['primary', 'secondary', 'background']
}
</script>


<style scoped>
.material-theme__wrapper {

}

.material-theme {
  margin: 16px 20px 8px;
  user-select: none;
  display: flex;
}
  .material-theme svg {
    cursor: pointer;
    margin-right: 8px;
    fill: rgba(0,0,0,.54);
  }
  .material-theme svg:hover {
    fill: rgba(0,0,0,.87);
  }

.material-theme__color-picker {
  margin: 0;
  width: 100%;
}
</style>
