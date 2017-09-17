<template>
  <v-layout row justify-center>
    <v-dialog v-model="app.pageDialog.isOpen" width="25%">
      <v-card>
        <v-card-title>
          <span class="headline">Add a new page</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field  required
                  label="Name"
                  v-model="newPage.name"
                  :rules="[ () => !!newPage.name || 'Choose a name for your page' ]"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field required
                  label="Page path"
                  v-model="newPage.path"
                  :rules="[ this.checkPathFormat ]"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat @click="discardPageAndClose(newPage)">Cancel</v-btn>
          <v-btn flat @click="savePageAndClose(newPage)">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>


<script>
import { mapState, mapActions } from 'vuex'
import { savePageAndClose, discardPageAndClose } from '@/store/types'

export default {
  name: 'page-dialog',
  computed: mapState(['app']),
  methods: {
    // TODO: Improve REGEX for path format
    checkPathFormat () {
      if (!this.newPage.path) {
        return 'Choose the page\'s path'
      } else if (this.newPage.path[0] !== '/') {
        return 'The path must start with \'/\''
      } else if (!this.newPage.path.match(/(\/\w+)\b/g)) {
        return 'Invalid path'
      }
      return true
    },
    ...mapActions([savePageAndClose, discardPageAndClose])
  },
  data () {
    return {
      newPage: {
        name: '',
        path: '',
        elements: []
      }
    }
  }
}
</script>
