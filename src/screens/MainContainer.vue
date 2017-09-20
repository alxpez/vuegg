<template>
  <div class="pageContainer">
    <!-- TODO: Add pages/routes to mockdata and implement for each on canvas -->
    <page></page>
  </div>
</template>


<script>
import { mapGetters } from 'vuex'
import Page from '@/components/Page'
import { pageExists } from '@/store/types'

export default {
  name: 'main-container',
  components: { Page },
  computed: mapGetters([pageExists]),
  mounted () {
    this.$router.replace({query: {page: 'home'}})
  },
  beforeRouteUpdate (to, from, next) {
    this.pageExists(to.query.page) ? next() : next(false)
  }
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
