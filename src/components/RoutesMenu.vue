<template>
  <v-layout row>
    <v-spacer></v-spacer>
    <page-dialog></page-dialog>

    <v-speed-dial :transition="'slide-x-reverse-transition'"
      :direction="'left'"
      :hover="true"
      :right="true"
      :top="true"
      v-model="speedD"
      class="mb-2"
    >
      <v-btn v-tooltip:bottom="{html: 'Page options'}"
        slot="activator"
        v-model="speedD"
        small
        hover
        fab
      >
        <v-icon>insert_drive_file</v-icon>
        <v-icon>close</v-icon>
      </v-btn>

      <v-btn v-tooltip:bottom="{html: 'New page'}"
        @click.native.stop="togglePageDialog({isOpen: true, isNew: true})"
        small
        icon
      >
        <v-icon>note_add</v-icon>
      </v-btn>
      <v-btn v-tooltip:bottom="{html: 'Edit page'}"
        @click.native.stop="togglePageDialog({isOpen: true, isNew: false})"
        small
        icon
      >
        <v-icon>edit</v-icon>
      </v-btn>
      <v-btn v-tooltip:bottom="{html: 'Delete page'}"
        @click.native.stop="deletePage(pageIndex)"
        small
        icon
      >
        <v-icon>delete</v-icon>
      </v-btn>
    </v-speed-dial>

    <v-flex xs3 class="mr-2 ml-1">
      <v-select
        :items="pages"
        v-model="activePage"
        item-text="name"
        item-value="id"
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

<!-- TODO: Select item does not refresh data after edit page -->
<!-- TODO: Think of changing this component completely... v-select SUCKS! -->

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
import { getPageById, getPageIndexById, deletePage, togglePageDialog } from '@/store/types'
import PageDialog from '@/components/PageDialog'

export default {
  name: 'routes-menu',
  components: { PageDialog },
  data: function () {
    return {
      speedD: false,
      activePage: {}
    }
  },
  mounted: function () {
    this.activePage = {
      id: this.pages[0].id,
      name: this.pages[0].name,
      path: this.pages[0].path
    }
  },
  computed: {
    pageIndex () {
      return this.getPageIndexById(this.$route.query.page)
    },
    ...mapState(['pages'])
  },
  methods: {
    changeActivePage (value) {
      this.$router.replace({query: {page: value.id}})
    },
    ...mapGetters([getPageById, getPageIndexById]),
    ...mapMutations([togglePageDialog, deletePage])
  }
}
</script>
