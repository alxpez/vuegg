<template>
  <div class="action-bar__wrapper">
    <mdc-button v-if="isSyncing" title="syncing" :disabled="true" class="action-btn syncing" dense>
      <svgicon icon="system/sync" width="24" height="24" color="rgba(0,0,0,.38)"></svgicon>
    </mdc-button>

    <mdc-button title="Undo" class="action-btn" :disabled="!canUndo" @click="undo" dense>
      <svgicon icon="system/undo" width="24" height="24"
        :color="canUndo ? '#2b6a73': 'rgba(0,0,0,.38)'">
      </svgicon>
    </mdc-button>

    <mdc-button title="Redo" class="action-btn" :disabled="!canRedo" @click="redo" dense>
      <svgicon icon="system/redo" width="24" height="24"
        :color="canRedo ? '#2b6a73': 'rgba(0,0,0,.38)'">
      </svgicon>
    </mdc-button>

    <mdc-button title="Preview" class="action-btn" dense>
      <svgicon icon="system/preview" width="24" height="24" color="#2b6a73"></svgicon>
    </mdc-button>

    <mdc-button title="Load vuegg project" class="action-btn" dense
      :disabled="isLoading" @click="loadProject">
      <svgicon icon="system/load" width="24" height="24" color="#2b6a73"></svgicon>
    </mdc-button>

    <mdc-button :title="saveBtnTitle" class="action-btn" dense
      :disabled="!isLoggedIn || !hasChanges || (isLoggedIn && isLoading)" @click="saveInGH"
    >
      <svgicon icon="system/cloud_off" v-if="!isLoggedIn"
        width="24" height="24" color="rgba(0,0,0,.38)">
      </svgicon>
      <svgicon icon="system/cloud_up" v-else-if="hasChanges"
        width="24" height="24" color="#2b6a73">
      </svgicon>
      <svgicon icon="system/cloud_done" v-else
        width="24" height="24" color="rgba(0,0,0,.38)">
      </svgicon>
    </mdc-button>
  </div>
</template>


<script>
import { mapState, mapActions } from 'vuex'
import { saveProjectInGH, loadVueggProject } from '@/store/types'
import redoundo from '@/mixins/redoundo'

import '@/assets/icons/system/sync'
import '@/assets/icons/system/undo'
import '@/assets/icons/system/redo'
import '@/assets/icons/system/preview'
import '@/assets/icons/system/load'
import '@/assets/icons/system/cloud_off'
import '@/assets/icons/system/cloud_up'
import '@/assets/icons/system/cloud_done'

export default {
  name: 'headegg',
  mixins: [redoundo],
  computed: {
    saveBtnTitle () {
      return !this.isLoggedIn
        ? 'Login with GitHub'
        : this.hasChanges
          ? 'Save in GitHub'
          : 'Nothing to save'
    },

    ...mapState({
      isLoading: state => state.app.isLoading,
      isSyncing: state => state.app.isSyncing,
      hasChanges: state => state.app.hasChanges,
      isLoggedIn: state => state.oauth.isAuthorized
    })
  },
  methods: {
    saveInGH () {
      this.saveProjectInGH()
    },

    loadProject () {
      this.loadVueggProject({origin: 'github', userName: 'vuegger', repoName: 'momo-mo'})
    },

    ...mapActions([saveProjectInGH, loadVueggProject])
  }
}
</script>


<style scoped>
.action-bar__wrapper {
  height: 100%;
  display: flex;
  flex-shrink: 0;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-self: stretch;
  align-items: center;
  box-sizing: border-box;
}

.action-btn {
  height: 36px;
  width: 36px;
  min-width: 28px;
  min-height: 28px;
  padding: 1px;
  margin: 0 6px;
  border-radius: 100%;
}
.action-btn * {
  vertical-align: middle;
}

.syncing {
  -webkit-animation:spin 1s linear infinite;
  -moz-animation:spin 1s linear infinite;
  animation:spin 1s linear infinite;
}
@-moz-keyframes spin { 100% {
  -moz-transform: rotate(360deg);
}}
@-webkit-keyframes spin { 100% {
  -webkit-transform: rotate(360deg);
}}
@keyframes spin { 100% {
  -webkit-transform: rotate(360deg);
  transform:rotate(360deg);
}}

</style>
