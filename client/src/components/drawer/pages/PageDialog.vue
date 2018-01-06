<template>
  <dialog class="mdl-dialog">
    <p class="mdl-dialog__title" :title="dialogTitle">{{dialogTitle}}</p>
    <div class="mdl-dialog__content">
      <mdc-textfield v-model="name" label="Name" @input="checkName" :helptext="nameError"
        minlength="1" helptext-validation helptext-persistent required
        class="dialog-input" :class="{'mdc-text-field--invalid': nameError}"/>

      <mdc-textfield v-model="path" label="Path" @input="checkPath" :helptext="pathError"
        minlength="1" helptext-validation helptext-persistent required
        class="dialog-input" :class="{'mdc-text-field--invalid': pathError}"/>
    </div>
    <div class="mdl-dialog__actions">
      <mdc-button @click="savePageAndClose({id, name, path})" :disabled="!valid">Save</mdc-button>
      <mdc-button @click="_togglePageDialog({isOpen: false, isNew: pageDialog.isNew})">Cancel</mdc-button>
    </div>
  </dialog>
</template>


<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
import { pathInUse, nameInUse, savePageAndClose, _togglePageDialog } from '@/store/types'
import dialogPolyfill from 'dialog-polyfill/dialog-polyfill'

export default {
  name: 'page-dialog',
  data: function () {
    return {
      valid: false,
      id: null,
      name: '',
      nameError: '',
      path: '',
      pathError: ''
    }
  },
  computed: {
    dialogTitle () {
      return this.pageDialog.isNew ? 'Add a new page' : 'Editing: ' + this.activePage.name
    },

    ...mapState({
      activePage: state => state.app.selectedPage,
      pageDialog: state => state ? state.app.pageDialog : {isNew: true, isOpen: false}
    }),

    ...mapGetters([pathInUse, nameInUse])
  },
  methods: {
    checkName () {
      if (!this.pageDialog.isNew && (this.name === this.activePage.name)) {
        this.nameError = ''
      } else if (!this.name) {
        this.nameError = 'Choose a name for your page'
      } else if (this.nameInUse(this.name)) {
        this.nameError = 'There\'s already a page with that name'
      } else {
        this.nameError = ''
      }
      this.valid = (this.name && !this.nameError && this.path && !this.pathError)
    },

    checkPath () {
      if (!this.pageDialog.isNew && (this.path === this.activePage.path)) {
        this.pathError = ''
      } else if (!this.path) {
        this.pathError = 'Choose the page\'s path'
      } else if (this.path[0] !== '/') {
        this.pathError = 'The path must start with /'
      } else if (!this.path.match(/^\/([A-Za-z0-9/_-])+$/g)) {
        this.pathError = 'Invalid path'
      } else if (this.pathInUse(this.path)) {
        this.pathError = 'This path already exists'
      } else {
        this.pathError = ''
      }
      this.valid = (this.name && !this.nameError && this.path && !this.pathError)
    },

    resetDialog () {
      this.valid = false
      this.id = null
      this.name = ''
      this.nameError = ''
      this.path = ''
      this.pathError = ''
    },

    setEditDialog (activePage) {
      this.id = activePage.id
      this.name = activePage.name
      this.path = activePage.path
    },

    ...mapActions([savePageAndClose]),
    ...mapMutations([_togglePageDialog])
  },
  watch: {
    'pageDialog.isOpen': function (val) {
      let dialog = this.$el

      if (!val) {
        this.resetDialog()
        dialog.close()
      } else {
        if (!dialog.showModal) {
          dialogPolyfill.registerDialog(dialog)
        }
        dialog.showModal()

        if (!this.pageDialog.isNew) {
          this.setEditDialog(this.activePage)
        }
      }
    }
  }
}
</script>


<style>
.mdl-dialog__title {
  font-size: 24px;
  font-weight: 500;
  max-height: 48px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.dialog-input{
  width: 100%;
}
</style>
