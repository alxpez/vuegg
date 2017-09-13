<template>
  <md-whiteframe class="page">
    <egglement v-for="el in elements" :key="el.id" :egg="el"></egglement>
  </md-whiteframe>
</template>


<script>
import { mapState } from 'vuex'
import Egglement from '@/components/Egglement'

export default {
  name: 'page',
  computed: mapState(['elements']),
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
