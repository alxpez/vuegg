<template>
  <mr-container
    :id="page.id"
    :style="page.styles"
    :class="[page.classes, {eggStage: true}]"
    :activeElements="selectedElements"
    @resizestop="resizeElements"
    @movestop="moveElements"
    @clearselection="_clearSelectedElements">

    <stage-el
      v-for="element in page.children"
      :key="element.id"
      :elem="element">
    </stage-el>

  </mr-container>
</template>


<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import { _clearSelectedElements, resizeEgglement, moveEgglement } from '@/store/types'

import MrContainer from '@/components/mr-vue/MrContainer'
import StageEl from './StageEl'

export default {
  name: 'stage',
  components: { StageEl, MrContainer },
  props: ['page'],
  computed: mapState({
    selectedElements: state => state ? state.app.selectedElements : []
  }),
  methods: {
    resizeElements (resizeList) {
      resizeList.map(resData => this.resizeEgglement({...resData, pageId: this.page.id}))
    },

    moveElements (moveList) {
      moveList.map(moveData => this.moveEgglement({...moveData, pageId: this.page.id, parentId: null}))
    },

    ...mapActions([resizeEgglement, moveEgglement]),
    ...mapMutations([_clearSelectedElements])
  }
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
