<template>
  <div id="layout-container" class="mdc-theme--background">
    <div id="app">
      <headegg :scroll0="notScrolled"></headegg>

      <drawegg></drawegg>

      <main id="main" role="main" @scroll="scrollFunction">
        <router-view></router-view>
      </main>

      <mdc-linear-progress v-show="loading" class="loader" accent indeterminate></mdc-linear-progress>
      <page-dialog></page-dialog>
      <block-loader></block-loader>
      <mdc-snackbar :dismisses-on-action="false"/>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import { loadVueggProject, checkAuth, checkLastSaved, rebaseSelectedElements } from '@/store/types'

import Headegg from '@/components/header'
import Drawegg from '@/components/drawer'
import PageDialog from '@/components/drawer/pages/PageDialog'
import BlockLoader from '@/components/common/BlockLoader'

export default {
  name: 'app',
  components: { Headegg, Drawegg, PageDialog, BlockLoader },
  data: function () {
    return {
      notScrolled: true
    }
  },
  created: function () {
    this.$root.$on('rebaseState', this.rebaseState)
  },
  mounted: function () {
    this.initializeState()
    this.loadVueggProject()
    this.checkAuth()
    this.checkLastSaved()
  },
  beforeDestroy: function () {
    this.$root.$off('rebaseState', this.rebaseState)
  },
  computed: {
    ...mapState({
      loading: state => state.app.isLoading
    })
  },
  methods: {
    scrollFunction (e) {
      this.notScrolled = (e.target.scrollTop === 0)
    },

    rebaseState () {
      this.checkAuth()
      this.checkLastSaved()
      this.rebaseSelectedElements()
    },

    ...mapMutations(['initializeState']),
    ...mapActions([rebaseSelectedElements, loadVueggProject, checkAuth, checkLastSaved])
  }
}
</script>

<style>
#layout-container {
  position: absolute;
  width: 100%;
  height: 100%;
}

.loader {
  top: 0;
  left: 0;
  height: 2px;
  width: 100%;
  position: absolute;
  z-index: 1001;
}

#app {
  font-family: 'Roboto', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
}

#main {
  height: 100%;
  -ms-flex: 0 1 auto;
  position: relative;
  display: inline-block;
  overflow-y: auto;
  overflow-x: auto;
  flex-grow: 1;
  z-index: auto;
  margin-right: 240px;
}

/* IN DEVICES SMALLER THAN 1024px -> NO DRAWER (so remove margins) - (TODO: show notice) */
@media screen and (max-width: 1024px) {
  #main {
    margin: 0px;
  }
}
</style>
