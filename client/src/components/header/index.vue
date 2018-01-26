<template>
  <div class="headegg mdc-theme--background" :class="{'not-scrolled': scroll0}">
    <button class="home-btn">
      <svgicon icon="product/vuegg" width="40" height="40" :original="true"></svgicon>
    </button>

    <input class="title-input" v-model="tmpProjectTitle" @blur="onTitleBlur" title="Title of your project" placeholder="Project title"/>

    <div class="spacer"></div>

    <mdc-button title="Undo" id="undoBtn" class="action-btn" :disabled="!canUndo" @click="undo" dense>
      <svgicon icon="system/undo" width="24" height="24"
        :color="canUndo ? '#2b6a73': 'rgba(0,0,0,.38)'">
      </svgicon>
    </mdc-button>

    <mdc-button title="Redo" id="redoBtn" class="action-btn" :disabled="!canRedo" @click="redo" dense>
      <svgicon icon="system/redo" width="24" height="24"
        :color="canRedo ? '#2b6a73': 'rgba(0,0,0,.38)'">
      </svgicon>
    </mdc-button>

    <mdc-button title="Preview" id="previewBtn" class="action-btn" dense>
      <svgicon icon="system/preview" width="24" height="24" color="#2b6a73"></svgicon>
    </mdc-button>

    <!-- <mdc-button class="gen-btn" @click="generate()" raised compact dense>Generate</mdc-button> -->
    <mdc-button class="gen-btn" @click="saveOnGH()" raised compact dense>Save</mdc-button>
    <mdc-button class="gen-btn" @click="loginGH()" raised compact dense>GH</mdc-button>
  </div>
</template>


<script>
import { mapState, mapMutations } from 'vuex'
import { updateProject } from '@/store/types'
import redoundo from '@/mixins/redoundo'

import '@/assets/icons/product/vuegg'
import '@/assets/icons/system/undo'
import '@/assets/icons/system/redo'
import '@/assets/icons/system/preview'

import * as download from 'downloadjs'
import axios from 'axios'
import auth from '@/auth'

export default {
  name: 'headegg',
  mixins: [redoundo],
  props: ['scroll0'],
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
    loginGH () {
      auth.authorize()
    },

    saveOnGH () {
      auth.saveProject()
    },

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
    ...mapMutations([updateProject])
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

.headegg {
  z-index: 1;
  height: 64px;
  width: calc(100% - 240px);
  color: rgba(0,0,0,0.66);
  padding: 0 25px 0 25px;
  margin-right: 240px;
  border: none;
  display: flex;
  flex-shrink: 0;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-self: stretch;
  align-items: center;
  box-sizing: border-box;
  box-shadow:
    0 2px 2px 0 rgba(0,0,0,.14),
    0 3px 1px -2px rgba(0,0,0,.2),
    0 1px 5px 0 rgba(0,0,0,.12);

  transition-duration: .2s;
  transition-timing-function: cubic-bezier(.4,0,.2,1);
  transition-property: max-height,box-shadow;
}
.not-scrolled {
  box-shadow: none;
}

/* IN DEVICES SMALLER THAN 1024px -> NO DRAWER (so remove margins) */
@media screen and (max-width: 1024px) {
  .headegg {
    margin: 0px;
    width: 100%;
  }
}

.spacer {
  width: 12px;
}

.home-btn {
  margin-right: 25px;
  border: none;
  border-radius: 100px;
  padding: 0;
  background-color: transparent;
  outline: none;
}

.title-input {
  flex-grow: 1;
  border: 0;
  height: 56px;
  background: transparent;
  outline: none;
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

.gen-btn {
  margin-left: 8px;
}
</style>
