<template>
  <div class="row">
    <page-dialog></page-dialog>
    <a href="#" @click.native.stop="togglePageDialog({isOpen: true, isNew: true})">NEW</a>
    <a href="#" @click.native.stop="deletePage(pageIndex)">EDIT</a>
    <a href="#" @click.native.stop="deletePage(pageIndex)">DEL</a>
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
