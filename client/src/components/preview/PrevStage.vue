<template>
  <div :id="page.id" :style="pageStyles" :class="[page.classes, {stage: true}]">
    <prev-stage-el
      v-for="element in page.children"
      :key="element.id"
      :elem="element">
    </prev-stage-el>
  </div>
</template>


<script>
import PrevStageEl from './PrevStageEl'

export default {
  name: 'prev-stage',
  components: { PrevStageEl },
  props: ['page'],
  computed: {
    pageStyles () {
      return {
        ...this.page.styles,
        height: (typeof this.page.height === 'string') ? this.page.height : (this.page.height + 'px'),
        width: (typeof this.page.width === 'string') ? this.page.width : (this.page.width + 'px')
      }
    }
  }
}
</script>


<style scoped>
.stage {
  /* for paper style */
  box-shadow:
    0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12),
    0 3px 1px -2px rgba(0, 0, 0, 0.2);
}
</style>
