<template>
  <div class="page">
    <egglement v-for="el in elements" :key="el.id" :egg="el"></egglement>
  </div>
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
  border: solid;
  border-width: thin;
  width: 1024px;
  height: 1000px;
}
</style>
