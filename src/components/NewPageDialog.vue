<template>
  <v-layout row justify-center>
    <v-dialog v-model="app.newPageDialog.isOpen" width="25%">
      <v-card>
        <v-card-title>
          <span class="headline">Add a new page</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field label="Name" v-model="newPage.name" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Page path" v-model="newPage.path" hint="ie. /books or /favourites/places" required></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat @click="discardNewPageAndClose(newPage)">Cancel</v-btn>
          <v-btn flat @click="saveNewPageAndClose(newPage)">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>


<script>
import { mapState, mapActions } from 'vuex'
import { saveNewPageAndClose, discardNewPageAndClose } from '@/store/types'

export default {
  name: 'new-page-dialog',
  computed: mapState(['app']),
  methods: mapActions([saveNewPageAndClose, discardNewPageAndClose]),
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
