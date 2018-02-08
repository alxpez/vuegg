<template>
  <div :id="page.id" :style="pageStyles" :class="[page.classes]">
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
