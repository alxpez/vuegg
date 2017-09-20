<template>
  <div class="page">
    <egglement v-for="el in elements" :key="el.id" :egg="el"></egglement>
  </div>
</template>


<script>
import { mapGetters } from 'vuex'
import { getPageById } from '@/store/types'
import Egglement from '@/components/Egglement'

export default {
  name: 'page',
  components: { Egglement },
  computed: {
    elements () {
      let activePage = this.getPageById(this.$route.query.page)
      return (activePage ? activePage.elements : [])
    },
    ...mapGetters([getPageById])
  }
}
</script>


<style scoped>
.page {
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
