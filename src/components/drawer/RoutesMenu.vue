<template>
  <div>
    <page-dialog></page-dialog>
    <a id="addPageBtn" @click.native.stop="togglePageDialog({isOpen: true, isNew: true})">
      <i class="material-icons md-48">add_circle</i>
    </a>
    <a id="editPageBtn" @click.native.stop="togglePageDialog({isOpen: true, isNew: false})">
      <i class="material-icons md-48">mode_edit</i>
    </a>
    <a id="deletePageBtn" @click.native.stop="deletePage(pageIndex)">
      <i class="material-icons md-48">remove_circle</i>
    </a>
  </div>
</template>

<!-- TODO: Select item does not refresh data after edit page -->

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
import { getPageById, getPageIndexById, deletePage, togglePageDialog } from '@/store/types'

import PageDialog from './PageDialog'

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
      id: this.project.pages[0].id,
      name: this.project.pages[0].name,
      path: this.project.pages[0].path
    }
  },
  computed: {
    pageIndex () {
      return this.getPageIndexById(this.$route.query.page)
    },
    ...mapState(['project'])
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

<style scoped>
#addPageBtn {
  cursor: pointer;
}

#editPageBtn {
  cursor: pointer;
}

#deletePageBtn {
  cursor: pointer;
}
</style>
