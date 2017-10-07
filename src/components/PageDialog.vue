<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialogState">
      <v-card>
        <v-card-title>
          <span class="headline">{{ dialogTitle }}</span>
        </v-card-title>
        <v-card-text>
          <v-form v-model="valid" ref="form">
            <v-text-field required label="Name" v-model="name"
              :rules="[ checkName ]"
            ></v-text-field>
            <v-text-field required label="Page path" v-model="path"
              :rules="[ checkPathFormat ]"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat @click="togglePageDialog({isOpen: false, isNew: app.pageDialog.isNew})">Cancel</v-btn>
          <v-btn flat @click="savePageAndClose({ name, path, id })" :disabled="!valid">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>


<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
import { getPageById, pathInUse, nameInUse, savePageAndClose, togglePageDialog } from '@/store/types'

export default {
  name: 'page-dialog',
  data: function () {
    return {
      valid: false,
      activePage: {},
      id: null,
      name: '',
      path: ''
    }
  },
  computed: {
    dialogState: {
      get () {
        return this.app.pageDialog.isOpen
      },
      set (isOpen) {
        this.togglePageDialog({isOpen, isNew: this.app.pageDialog.isNew})
      }
    },
    dialogTitle () {
      return this.app.pageDialog.isNew ? 'Add a new page' : 'Editing: ' + this.activePage.name
    },
    ...mapState(['app']),
    ...mapGetters([getPageById, pathInUse, nameInUse])
  },
  methods: {
    checkName () {
      if (!this.app.pageDialog.isNew && (this.name === this.activePage.name)) {
        return true
      } else if (!this.name) {
        return 'Choose a name for your page'
      } else if (this.nameInUse(this.name)) {
        return 'There\'s already a page with that name'
      }
      return true
    },
    checkPathFormat () {
      if (!this.app.pageDialog.isNew && (this.path === this.activePage.path)) {
        return true
      } else if (!this.path) {
        return 'Choose the page\'s path'
      } else if (this.path[0] !== '/') {
        return 'The path must start with \'/\''
      } else if (!this.path.match(/^\/([A-Za-z0-9/_-])+$/g)) {
        return 'Invalid path'
      } else if (this.pathInUse(this.path)) {
        return 'This path already exists'
      }
      return true
    },
    resetDialog () {
      this.id = null
      this.$refs.form.reset()
    },
    ...mapActions([savePageAndClose]),
    ...mapMutations([togglePageDialog])
  },
  watch: {
    'app.pageDialog.isOpen': function (val) {
      if (!val) {
        // Close dialog
        this.resetDialog()
      } else if (!this.app.pageDialog.isNew) {
        // Open dialog on edit mode
        this.activePage = this.getPageById(this.$route.query.page)
        this.id = this.activePage.id
        this.name = this.activePage.name
        this.path = this.activePage.path
      }
    }
  }
}
</script>
