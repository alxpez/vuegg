<template>
  <div class="slider__wrapper" v-tooltip.left="{content: label + ' (' + currentValue + ')', delay: 0, offset: 0}">
    <mdc-slider :min="min" :max="max" :step="step" v-model="currentValue" layout-on="show-settings"/>
    <svgicon v-show="(icon !== '')" :icon="icon" width="22" height="22" color="rgba(0,0,0,.87)"></svgicon>
  </div>
</template>


<script>
export default {
  name: 'slider',
  props: {
    value: {type: Number, default: 1},
    min: {type: String, default: '0'},
    max: {type: String, default: '1'},
    step: {type: String, default: null},
    label: {type: String, default: ''},
    icon: {type: String, default: ''}
  },
  computed: {
    currentValue: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('change', Math.round(val * 100) / 100)
      }
    }
  }
}
</script>


<style scoped>
.slider__wrapper {
  display: inline-flex;
  margin: 0 20px;
}
.slider__wrapper svg {
  margin: 12px 0 0 10px;
}
</style>
