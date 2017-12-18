<template>
  <div class="mainegg">
    <stage v-if="selectedPage" :page="selectedPage"></stage>
  </div>
</template>


<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
import { _changeActivePage, _rebaseActivePage, getPageIndexById } from '@/store/types'

import Stage from './Stage'

export default {
  name: 'mainegg',
  components: { Stage },
  created: function () {
    if (!this.selectedPage && this.pages.length) {
      this._changeActivePage(this.pages[0])
    }
  },
  computed: {
    ...mapState({
      selectedPage: state => state.app.selectedPage,
      pages: state => state ? state.project.pages : []
    }),
    ...mapGetters([getPageIndexById])
  },
  methods: mapMutations([_changeActivePage, _rebaseActivePage]),
  watch: {
    selectedPage: function (val) {
      this._rebaseActivePage(this.getPageIndexById(val.id))
      // TODO: possibly rebasing activeElements as well ?
    }
  }
}
</script>

<style scoped>
.mainegg {
  /* display: inline-flex; */
  margin: 10px 15px 35px;
}
</style>
