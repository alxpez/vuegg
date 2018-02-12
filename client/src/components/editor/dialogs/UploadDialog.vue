<template>
  <dialog>
    <p class="upload-dialog__title">Upload your vuegg project to Github</p>
    <div class="upload-dialog__content">
      <span>{{owner}}/{{repo}}</span>

      <mdc-textfield v-model="repo" label="Repository" @input="checkRepo" :helptext="repoError"
        minlength="1" helptext-validation helptext-persistent required
        class="upload-dialog__input"  :class="{'mdc-text-field--invalid': repoError}"/>
    </div>
    <div class="upload-dialog__actions">
      <mdc-button @click="onUpload" unelevated :disabled="!valid">Upload</mdc-button>
      <mdc-button @click="closeDialog">Cancel</mdc-button>
    </div>
  </dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { uploadProjectToGH } from '@/store/types'
import dialogPolyfill from 'dialog-polyfill/dialog-polyfill'
import localforage from 'localforage'

export default {
  name: 'upload-dialog',
  data: function () {
    return {
      valid: true,
      owner: '',
      repo: '',
      repoError: ''
    }
  },
  created: function () {
    this.$root.$on('open-upload-dialog', this.openDialog)
  },
  beforeDestroy: function () {
    this.$root.$off('open-upload-dialog', this.openDialog)
  },
  computed: {
    ...mapState({
      loggedUser: state => state.oauth.authenticatedUser,
      projectTitle: state => state ? state.project.title : ''
    })
  },
  methods: {
    checkRepo () {
      if (!this.repo) {
        this.repoError = 'Insert the name of the repo to load'
      } else if (!this.repo.match(/^[a-z0-9-]+$/i)) {
        this.repoError = 'This is not a valid repository name.'
      } else {
        this.repoError = ''
      }
      this.valid = (this.repo && !this.repoError)
    },

    async openDialog () {
      if (!this.$el.showModal) {
        dialogPolyfill.registerDialog(this.$el)
      }

      this.owner = this.loggedUser ? this.loggedUser.login : ''
      this.repo = await localforage.getItem('gh-repo-name') || this.projectTitle.replace(/[^a-zA-Z0-9-_]+/g, '-')
      this.$el.showModal()
    },

    onUpload () {
      this.uploadProjectToGH({repoName: this.repo})
      this.closeDialog()
    },

    resetDialog () {
      this.isValid = false
      this.repo = ''
      this.repoError = ''
    },

    closeDialog () {
      this.resetDialog()
      this.$el.close()
    },

    ...mapActions([uploadProjectToGH])
  }
}
</script>


<style scoped>
.upload-dialog__title {
  font-size: 24px;
  font-weight: 500;
  padding: 24px 24px 0;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
}

.upload-dialog__content {
  padding: 20px 24px 24px;
  color: rgba(0,0,0,.54);
}
.upload-dialog__content .upload-dialog__input{
  width: 100%;
}

.upload-dialog__actions {
  padding: 8px 8px 8px 24px;
  display: flex;
  flex-direction: row-reverse;
  flex-wrap: wrap;
}
</style>
