<template>
  <mr-container
    :id="page.id"
    :style="page.styles"
    :class="[page.classes, {eggStage: true}]">

    <stage-el
      v-for="element in page.children"
      :key="element.id"
      :elem="element">
    </stage-el>

  </mr-container>
</template>


<script>
import MrContainer from '@/components/mr-vue/MrContainer'
import StageEl from './StageEl'

export default {
  name: 'stage',
  components: { StageEl, MrContainer },
  props: ['page']
}
</script>


<style scoped>
.eggStage {
  /* for paper style */
  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.2),
    0 1px 1px rgba(0, 0, 0, 0.14),
    0 2px 1px -1px rgba(0, 0, 0, 0.12);
}
</style>
