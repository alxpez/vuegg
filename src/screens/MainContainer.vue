<template>
  <div class="pageContainer">
    <egg-stage></egg-stage>
  </div>
</template>


<script>
import { mapGetters } from 'vuex'
import EggStage from '@/components/EggStage'
import { pageExists } from '@/store/types'

export default {
  name: 'main-container',
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
.pageContainer {
  margin-top: 65px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
