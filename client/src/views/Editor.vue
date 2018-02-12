<template>
  <div class="layout-container">
    <div class="edit-view">
      <mdc-linear-progress v-show="loading" class="linear-loader" accent indeterminate></mdc-linear-progress>
      <headegg :scroll0="notScrolled"></headegg>

      <drawegg></drawegg>

      <main id="main" role="main" @scroll="scrollFunction">
        <mainegg></mainegg>
      </main>

      <page-dialog></page-dialog>
      <load-dialog></load-dialog>
      <upload-dialog></upload-dialog>
      <confirm-dialog></confirm-dialog>

      <block-loader></block-loader>
      <mdc-snackbar :dismisses-on-action="false"/>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { checkAuth, checkLastSaved, rebaseSelectedElements } from '@/store/types'

import Headegg from '@/components/editor/header'
import Drawegg from '@/components/editor/drawer'
import Mainegg from '@/components/editor/main'
import BlockLoader from '@/components/editor/common/loader/BlockLoader'
import PageDialog from '@/components/editor/dialogs/PageDialog'
import LoadDialog from '@/components/editor/dialogs/LoadDialog'
import UploadDialog from '@/components/editor/dialogs/UploadDialog'
import ConfirmDialog from '@/components/editor/dialogs/ConfirmDialog'

export default {
  name: 'editor',
  components: { Headegg, Drawegg, Mainegg, BlockLoader, PageDialog, LoadDialog, UploadDialog, ConfirmDialog },
  data: function () {
    return {
      notScrolled: true
    }
  },
  created: function () {
    this.$root.$on('rebaseState', this.rebaseState)
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

    ...mapActions([rebaseSelectedElements, checkAuth, checkLastSaved])
  }
}
</script>

<style>
.layout-container {
  position: absolute;
  width: 100%;
  height: 100%;
}

.edit-view {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
}

#main {
  height: 100%;
  position: relative;
  display: inline-block;
  overflow-y: auto;
  overflow-x: auto;
  flex-grow: 1;
  margin-right: 240px;
}

/* IN DEVICES SMALLER THAN 1024px -> NO DRAWER (so remove margins) - (TODO: show notice) */
@media screen and (max-width: 1024px) {
  #main {
    margin: 0px;
  }
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
