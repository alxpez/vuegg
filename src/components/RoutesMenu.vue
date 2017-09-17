<template>
  <v-layout row>
    <v-spacer></v-spacer>
    <page-dialog></page-dialog>
    <v-btn icon @click.native.stop="openNewPageDialog" v-tooltip:left="{html: 'New page'}">
      <v-icon>add</v-icon>
    </v-btn>
    <v-flex xs3>
      <v-select
        :items="pages"
        v-model="activePage"
        item-text="name"
        item-value="id"
        append-icon="insert_drive_file"
        single-line
        hide-details
        return-object
        persistent-hint
        :hint="activePage.path"
        @input="changeActivePage"
      ></v-select>
    </v-flex>
  </v-layout>
</template>


<script>
import { mapState, mapMutations } from 'vuex'
import { openNewPageDialog } from '@/store/types'
import PageDialog from '@/components/PageDialog'

export default {
  name: 'routes-menu',
  components: { PageDialog },
  computed: mapState(['pages']),
  methods: {
    changeActivePage (value) {
      this.$router.replace({query: {page: value.id}})
    },
    ...mapMutations([openNewPageDialog])
  },
  data () {
    return {
      activePage: {}
    }
  },
  mounted () {
    this.activePage = this.pages[0]
  }
}
</script>
