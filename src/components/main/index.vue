<template>
  <div class="mainegg">
    <egg-stage v-if="selectedPage"></egg-stage>
  </div>
</template>


<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
import { _changeActivePage, _rebaseActivePage, getPageIndexById } from '@/store/types'
import EggStage from './EggStage'

export default {
  name: 'mainegg',
  components: { EggStage },
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
    }
  }
}
</script>

<style scoped>
.mainegg {
  margin: 10px 10px 35px;
}
</style>
