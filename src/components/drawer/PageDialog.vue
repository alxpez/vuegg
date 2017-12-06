<template>
  <dialog class="mdl-dialog">
    <p class="mdl-dialog__title">{{dialogTitle}}</p>
    <div class="mdl-dialog__content">
      <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label" :class="{'is-invalid': nameError !== ''}">
        <input class="mdl-textfield__input" type="text" @input="checkName" v-model="name" id="pageName">
        <label class="mdl-textfield__label" for="pageName">Name</label>
        <span class="mdl-textfield__error">{{nameError}}</span>
      </div>
      <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label" :class="{'is-invalid': pathError !== ''}">
        <input class="mdl-textfield__input" type="text" @input="checkPathFormat" v-model="path" id="pagePath">
        <label class="mdl-textfield__label" for="pagePath">Path</label>
        <span class="mdl-textfield__error">{{pathError}}</span>
      </div>
    </div>
    <div class="mdl-dialog__actions">
      <button type="button" class="mdl-button"
        @click="savePageAndClose({ id, name, path})" :disabled="!valid"
      >Save</button>
      <button type="button" class="mdl-button close"
        @click="togglePageDialog({isOpen: false, isNew: app.pageDialog.isNew})"
      >Cancel</button>
    </div>
  </dialog>
</template>


<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
import { getPageById, pathInUse, nameInUse, savePageAndClose, togglePageDialog } from '@/store/types'

import dialogPolyfill from 'dialog-polyfill/dialog-polyfill'

export default {
  name: 'page-dialog',
  data: function () {
    return {
      valid: false,
      activePage: {},
      id: null,
      name: '',
      nameError: '',
      path: '',
      pathError: ''
    }
  },
  computed: {
    dialogTitle () {
      return this.app.pageDialog.isNew ? 'Add a new page' : 'Editing: ' + this.activePage.name
    },
    ...mapState(['app']),
    ...mapGetters([getPageById, pathInUse, nameInUse])
  },
  methods: {
    checkName () {
      this.nameError = ''

      if (!this.app.pageDialog.isNew && (this.name === this.activePage.name)) {
        this.nameError = ''
      } else if (!this.name) {
        this.nameError = 'Choose a name for your page'
      } else if (this.nameInUse(this.name)) {
        this.nameError = 'There\'s already a page with that name'
      }

      this.valid = (this.nameError === '' && this.pathError === '' && this.name !== '' && this.path !== '')
    },
    checkPathFormat () {
      this.pathError = ''

      if (!this.app.pageDialog.isNew && (this.path === this.activePage.path)) {
        this.pathError = ''
      } else if (!this.path) {
        this.pathError = 'Choose the page\'s path'
      } else if (this.path[0] !== '/') {
        this.pathError = 'The path must start with \'/\''
      } else if (!this.path.match(/^\/([A-Za-z0-9/_-])+$/g)) {
        this.pathError = 'Invalid path'
      } else if (this.pathInUse(this.path)) {
        this.pathError = 'This path already exists'
      }

      this.valid = (this.nameError === '' && this.pathError === '' && this.name !== '' && this.path !== '')
    },
    resetDialog () {
      this.activePage = {}
      this.id = null
      this.name = ''
      this.nameError = ''
      this.path = ''
      this.pathError = ''
    },
    setEditDialog (activePage) {
      this.activePage = activePage
      this.id = activePage.id
      this.name = activePage.name
      this.path = activePage.path
    },
    ...mapActions([savePageAndClose]),
    ...mapMutations([togglePageDialog])
  },
  watch: {
    'app.pageDialog.isOpen': function (val) {
      let dialog = this.$el

      if (!val) {
        this.resetDialog()
        dialog.close()
      } else {
        if (!dialog.showModal) {
          dialogPolyfill.registerDialog(dialog)
        }
        dialog.showModal()

        if (!this.app.pageDialog.isNew) {
          this.setEditDialog(this.getPageById(this.$route.query.page))
        }
      }
    }
  }
}
</script>

<style scoped>
.mdl-dialog__title {
    font-size: 24px;
    font-weight: 500;
}
</style>
