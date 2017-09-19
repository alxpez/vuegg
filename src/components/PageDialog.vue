<template>
  <v-layout row justify-center>
    <v-dialog v-model="app.pageDialog.isOpen">
      <v-card>
        <v-card-title>
          <span class="headline">Add a new page</span>
        </v-card-title>
        <v-card-text>
          <v-form v-model="valid" ref="form">
            <v-text-field  required
              label="Name"
              v-model="name"
              :rules="[ () => !!name || 'Choose a name for your page' ]"
            ></v-text-field>
            <v-text-field required
              label="Page path"
              v-model="path"
              :rules="[ this.checkPathFormat ]"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat @click="submitAction('cancel')">Cancel</v-btn>
          <v-btn flat @click="submitAction('save')">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>


<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import { savePageAndClose, closePageDialog } from '@/store/types'

export default {
  name: 'page-dialog',
  computed: mapState(['app']),
  methods: {
    checkPathFormat () {
      if (!this.path) {
        return 'Choose the page\'s path'
      } else if (this.path[0] !== '/') {
        return 'The path must start with \'/\''
      } else if (!this.path.match(/^\/([A-Za-z0-9/_-])+$/g)) {
        return 'Invalid path'
      }
      return true
    },
    submitAction (action) {
      let newPage = { name: this.name, path: this.path }
      this.$refs.form.reset()
      action === 'save' ? this.savePageAndClose(newPage) : this.closePageDialog()
    },
    ...mapActions([savePageAndClose]),
    ...mapMutations([closePageDialog])
  },
  data () {
    return {
      valid: false,
      name: '',
      path: ''
    }
  }
}
</script>
