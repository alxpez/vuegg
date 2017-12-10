<template>
  <div id="headegg" class="mdl-layout__header-row">
    <button id="homeBtn" class="mdl-button mdl-js-button mdl-button--icon">
      <!-- Subtitue for vuegg logo -->
      <i class="material-icons">cloud_circle</i>
    </button>
    <div id="inputTitle" class="mdl-textfield mdl-js-textfield">
      <input class="mdl-textfield__input" type="text" id="pTitle" v-model="tmpProjectTitle" @blur="onTitleBlur">
      <label class="mdl-textfield__label" for="pTitle" v-show="!tmpProjectTitle">Project title</label>
    </div>

    <div class="mdl-layout-spacer"></div>

    <mdc-button id="undoBtn" class="actionBtn" :disabled="!canUndo" @click="undo">
      <i class="material-icons">undo</i>
    </mdc-button>
    <div class="mdl-tooltip" data-mdl-for="undoBtn" v-show="canUndo">Undo</div>

    <mdc-button id="redoBtn" class="actionBtn" :disabled="!canRedo" @click="redo">
      <i class="material-icons">redo</i>
    </mdc-button>
    <div class="mdl-tooltip" data-mdl-for="redoBtn" v-show="canRedo">Redo</div>

    <mdc-button id="previewBtn" class="actionBtn">
      <i class="material-icons">remove_red_eye</i>
    </mdc-button>
    <div class="mdl-tooltip" data-mdl-for="previewBtn">Preview</div>

    <mdc-button class="genBtn" @click="generate()" raised compact dense>Generate</mdc-button>
  </div>
</template>


<script>
import { mapState, mapMutations } from 'vuex'
import { _toggleSidebar, updateProject } from '@/store/types'

import * as download from 'downloadjs'
import axios from 'axios'

export default {
  name: 'headegg',
  data: function () {
    return {
      tmpProjectTitle: ''
    }
  },
  computed: mapState({
    project: state => state ? state.project : {},
    projectTitle: state => state ? state.project.title : ''
  }),
  methods: {
    async generate () {
      try {
        let resp = await axios.post('/api/generate', this.project, {responseType: 'blob'})
        download(resp.data, this.projectTitle + '.zip', resp.data.type)
      } catch (error) {
        console.error(error)
        console.error('CHECK IF THE BACKEND SERVER IS UP AND RUNNING')
      }
    },
    onTitleBlur () {
      if (this.tmpProjectTitle && (this.tmpProjectTitle !== this.projectTitle)) {
        this.updateProject({title: this.tmpProjectTitle})
      } else {
        this.tmpProjectTitle = this.projectTitle
      }
    },
    ...mapMutations([_toggleSidebar, updateProject])
  },
  created: function () {
    this.tmpProjectTitle = this.projectTitle
  },
  watch: {
    'projectTitle': function (val) {
      this.tmpProjectTitle = val
    }
  }
}
</script>


<style scoped>
#headegg {
  height: 64px;
  background: #eeeeee;
  color: rgba(0,0,0,0.66);
  padding: 0 25px 0 25px;
}

@media screen and (max-width: 1024px) {
  #headegg {
    height: 56px;
    padding: 0 15px 0 15px;
    margin-right: 240px;
  }
}

#homeBtn {
  margin-right: 25px;
}

#inputTitle {
  border: 0;
  width: 45%;
}

.actionBtn {
  height: 36px;
  width: 36px;
  min-width: 28px;
  min-height: 28px;
  padding: 0 1px 1px 0;
  margin: 0 6px;
  border-radius: 100%;
}

.actionBtn .material-icons {
  vertical-align: middle;
}

.genBtn {
  margin-left: 8px;
}
</style>
