<template>
  <v-layout row justify-center>
    <v-dialog v-model="app.pageDialog.isOpen">
      <v-card>
        <v-card-title>
          <span class="headline">Add a new page</span>
        </v-card-title>
        <v-card-text>
          <v-form v-model="valid" ref="form">
            <v-text-field required label="Name" v-model="name"
              :rules="[ () => !!name || 'Choose a name for your page' ]"
            ></v-text-field>
            <v-text-field required label="Page path" v-model="path"
              :rules="[ this.checkPathFormat ]"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat @click="closePageDialog">Cancel</v-btn>
          <v-btn flat @click="savePageAndClose({ name, path })" :disabled="!valid">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>


<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
import { getPageById, pathInUse, savePageAndClose, closePageDialog } from '@/store/types'

export default {
  name: 'page-dialog',
  computed: {
    ...mapState(['app']),
    ...mapGetters([getPageById, pathInUse])
  },
  methods: {
    checkPathFormat () {
      if (!this.path) {
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
    ...mapActions([savePageAndClose]),
    ...mapMutations([closePageDialog])
  },
  watch: {
    'app.pageDialog.isOpen': function (val) {
      if (!val) {
        this.$refs.form.reset()
         // Dialog closed
      } else if (!this.app.pageDialog.isNew) {
        let activePage = this.getPageById(this.$route.query.page)
        this.name = activePage.name
        this.path = activePage.path
        // Dialog opened on edit mode
      }
    }
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
