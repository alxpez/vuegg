<template>
  <div id="mainegg" class="col mt-2 mb-3">
    <egg-stage v-if="pages.length"></egg-stage>
  </div>
</template>


<script>
import { mapState, mapGetters } from 'vuex'
import { pageExists } from '@/store/types'
import EggStage from './EggStage'

export default {
  name: 'mainegg',
  components: { EggStage },
  created: function () {
    this.$router.replace({query: {page: 'home'}})
  },
  beforeRouteUpdate: function (to, from, next) {
    // Cancels navigation if page is unexistent
    this.pageExists(to.query.page) ? next() : next(false)
  },
  computed: {
    ...mapState({
      pages: state => state ? state.project.pages : []
    }),
    ...mapGetters([pageExists])
  }
}
</script>


<style scoped>
#mainegg {
}
</style>
