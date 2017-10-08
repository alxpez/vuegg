<template>
  <div class="eggStage" :id="$route.query.page">
    <egglement v-for="el in egglements" :key="el.id" :egg="el"></egglement>
  </div>
</template>


<script>
import { mapGetters } from 'vuex'
import { getPageById } from '@/store/types'
import Egglement from '@/components/Egglement'

export default {
  name: 'egg-stage',
  components: { Egglement },
  computed: {
    egglements () {
      let activePage = this.getPageById(this.$route.query.page)
      return (activePage ? activePage.children : [])
    },
    ...mapGetters([getPageById])
  }
}
</script>


<style scoped>
.eggStage {
  width: 1024px;
  height: 1000px;
  /* width and height should be assigned dynamicly */
  position: relative;
  margin: auto;
  background-color: #fff;

  /* for paper style */
  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.2),
    0 1px 1px rgba(0, 0, 0, 0.14),
    0 2px 1px -1px rgba(0, 0, 0, 0.12);
}
</style>
