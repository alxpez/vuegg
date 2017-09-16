<template>
  <md-whiteframe class="page">
    <egglement v-for="el in elements" :key="el.id" :egg="el"></egglement>
  </md-whiteframe>
</template>


<script>
import { mapGetters } from 'vuex'
import Egglement from '@/components/Egglement'

export default {
  name: 'page',
  computed: {
    elements () {
      let activePage = this.getPageById(this.$route.query.page)
      return (activePage ? activePage.elements : [])
    },
    ...mapGetters(['getPageById'])
  },
  components: { Egglement }
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
}
</style>
