<template>
  <div id="mainContainer" class="col">
    <routes-menu></routes-menu>
    <egg-stage></egg-stage>
  </div>
</template>


<script>
import { mapGetters } from 'vuex'
import { pageExists } from '@/store/types'

import EggStage from './EggStage'
import RoutesMenu from './RoutesMenu'

export default {
  name: 'main-container',
  components: { EggStage, RoutesMenu },
  mounted: function () {
    this.$router.replace({query: {page: 'home'}})
  },
  beforeRouteUpdate: function (to, from, next) {
    // Cancels navigation if page is unexistent
    this.pageExists(to.query.page) ? next() : next(false)
  },
  computed: mapGetters([pageExists])
}
</script>


<style scoped>
#mainContainer {
}
</style>
