<template>
  <div id="mainegg" class="col mt-2 mb-3">
    <egg-stage></egg-stage>
  </div>
</template>


<script>
import { mapGetters } from 'vuex'
import { pageExists } from '@/store/types'

import EggStage from './EggStage'

export default {
  name: 'mainegg',
  components: { EggStage },
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
#mainegg {
}
</style>
