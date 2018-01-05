<template>
  <div class="mainegg">
    <stage v-if="selectedPage" :page="selectedPage"></stage>
  </div>
</template>


<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
import { _changeActivePage, _rebaseActivePage, rebaseSelectedElements, getPageIndexById } from '@/store/types'

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
  watch: {
    // After a redo/undo action this will apply
    selectedPage: function (val) {
      this._rebaseActivePage(this.getPageIndexById(val.id))
      this.rebaseSelectedElements()
    }
  },
  methods: {
    ...mapMutations([_changeActivePage, _rebaseActivePage]),
    ...mapActions([rebaseSelectedElements])
  }
}
</script>

<style scoped>
.mainegg {
  margin: 10px 15px 35px;
}
</style>
