<template>
  <div class="action-bar__wrapper">
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

    <mdc-button :title="saveBtnTitle" class="action-btn" dense
      :disabled="!isLoggedIn || !hasChanges || (isLoggedIn && isSaving)" @click="saveInGH"
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
import { saveProjectInGH } from '@/store/types'
import redoundo from '@/mixins/redoundo'

import '@/assets/icons/system/undo'
import '@/assets/icons/system/redo'
import '@/assets/icons/system/preview'
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
      isSaving: state => state.app.isLoading,
      isLoggedIn: state => state.oauth.isAuthorized,
      hasChanges: state => state.app.hasChanges
    })
  },
  methods: {
    saveInGH () {
      this.saveProjectInGH()
    },

    ...mapActions([saveProjectInGH])
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
</style>
