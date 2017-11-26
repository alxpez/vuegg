<template>
  <div :id="activePage.id"
    :style="activePage.styles"
    :class="[activePage.classes, {eggStage: true}]"
  >
    <egglement v-for="el in activePage.children" :key="el.id" :egg="el"></egglement>
  </div>
</template>


<script>
import { mapGetters } from 'vuex'
import { getPageById } from '@/store/types'
import Egglement from './Egglement'

export default {
  name: 'egg-stage',
  components: { Egglement },
  computed: {
    activePage () {
      return this.getPageById(this.$route.query.page)
    },
    ...mapGetters([getPageById])
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
