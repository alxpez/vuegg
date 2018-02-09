<template>
  <dialog>
    <p class="load-dialog__title">Load a vuegg project from Github</p>
    <div class="load-dialog__content">
      <mdc-textfield v-model="owner" label="Owner" @input="checkOwner" :helptext="ownerError"
        minlength="1" helptext-validation helptext-persistent required
        class="load-dialog__input"  :class="{'mdc-text-field--invalid': ownerError}"/>

      <mdc-textfield v-model="repo" label="Repository" @input="checkRepo" :helptext="repoError"
        minlength="1" helptext-validation helptext-persistent required
        class="load-dialog__input"  :class="{'mdc-text-field--invalid': repoError}"/>
    </div>
    <div class="load-dialog__actions">
      <mdc-button @click="onLoad" unelevated :disabled="!valid">Load</mdc-button>
      <mdc-button @click="closeDialog">Cancel</mdc-button>
    </div>
  </dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { loadVueggProject } from '@/store/types'
import dialogPolyfill from 'dialog-polyfill/dialog-polyfill'

export default {
  name: 'load-dialog',
  data: function () {
    return {
      valid: false,
      owner: '',
      ownerError: '',
      repo: '',
      repoError: ''
    }
  },
  created: function () {
    this.$root.$on('open-load-dialog', this.openDialog)
  },
  beforeDestroy: function () {
    this.$root.$off('open-load-dialog', this.openDialog)
  },
  computed: {
    ...mapState({
      loggedUser: state => state.oauth.authenticatedUser
    })
  },
  methods: {
    checkOwner () {
      if (!this.owner) {
        this.ownerError = "Insert the username of the repository's owner"
      } else if (!this.owner.match(/^[a-z0-9]([a-z0-9-]*){0,38}$/i)) {
        this.ownerError = 'This is not a valid username'
      } else {
        this.ownerError = ''
      }
      this.valid = (this.owner && !this.ownerError && this.repo && !this.repoError)
    },

    checkRepo () {
      if (!this.repo) {
        this.repoError = 'Insert the name of the repo to load'
      } else if (!this.repo.match(/^[a-z0-9-]+$/i)) {
        this.repoError = 'This is not a valid repository name'
      } else {
        this.repoError = ''
      }
      this.valid = (this.owner && !this.ownerError && this.repo && !this.repoError)
    },

    openDialog () {
      if (!this.$el.showModal) {
        dialogPolyfill.registerDialog(this.$el)
      }

      this.owner = this.loggedUser ? this.loggedUser.login : ''
      this.$el.showModal()
    },

    onLoad () {
      this.loadVueggProject({origin: 'github', userName: this.owner, repoName: this.repo})
      this.closeDialog()
    },

    resetDialog () {
      this.isValid = false
      this.owner = ''
      this.ownerError = ''
      this.repo = ''
      this.repoError = ''
    },

    closeDialog () {
      this.resetDialog()
      this.$el.close()
    },

    ...mapActions([loadVueggProject])
  }
}
</script>


<style scoped>
.load-dialog__title {
  font-size: 24px;
  font-weight: 500;
  padding: 24px 24px 0;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
}

.load-dialog__content {
  padding: 20px 24px 24px;
  color: rgba(0,0,0,.54);
}
.load-dialog__content .load-dialog__input{
  width: 100%;
}

.load-dialog__actions {
  padding: 8px 8px 8px 24px;
  display: flex;
  flex-direction: row-reverse;
  flex-wrap: wrap;
}
</style>
