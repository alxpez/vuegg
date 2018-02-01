<template>
  <div id="layout-container" class="mdc-theme--background">
    <div id="app">
      <mdc-linear-progress v-show="loading" class="linear-loader" accent indeterminate></mdc-linear-progress>
      <headegg :scroll0="notScrolled"></headegg>

      <drawegg></drawegg>

      <main id="main" role="main" @scroll="scrollFunction">
        <router-view></router-view>
      </main>

      <page-dialog></page-dialog>
      <load-dialog></load-dialog>
      <confirm-dialog></confirm-dialog>

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
import BlockLoader from '@/components/common/BlockLoader'
import PageDialog from '@/components/dialogs/PageDialog'
import LoadDialog from '@/components/dialogs/LoadDialog'
import ConfirmDialog from '@/components/dialogs/ConfirmDialog'

export default {
  name: 'app',
  components: { Headegg, Drawegg, BlockLoader, PageDialog, LoadDialog, ConfirmDialog },
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
    this.loadVueggProject({origin: 'local'})
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

.vue-tooltip.tooltip-vuegg {
  font-family: 'Roboto', Helvetica, Arial, sans-serif;
  font-size: 12px;
  z-index: 1010;
  border-radius: 3px;
  background-color: #616161;
  box-shadow:
    0 1px 3px rgba(0,0,0,0.12),
    0 1px 2px rgba(0,0,0,0.24);
}
.vue-tooltip.tooltip-vuegg .tooltip-arrow {
  border-color: #616161 !important;
}

dialog {
  width: 320px !important;
  border: none !important;
  box-shadow:
    0 9px 46px 8px rgba(0,0,0,.14),
    0 11px 15px -7px rgba(0,0,0,.12),
    0 24px 38px 3px rgba(0,0,0,.2);
}

dialog, dialog::backdrop {
  animation-name: anim-open;
  animation-duration: 0.3s;
  animation-fill-mode: forwards;
}

@keyframes anim-open {
	0% { opacity: 0; transform: scale3d(1.1, 1.1, 1); }
	100% { opacity: 1; transform: scale3d(1, 1, 1); }
}
</style>


<style scoped>
.linear-loader {
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1001;
  height: 2px !important;
  position: absolute !important;
}
</style>
