<template>
  <div id="pagesMenu">
    <mdc-list class="pageList">
      <div v-for="(page, pageIndex) in projectPages" :key="page.id"
          :class="{active: (page.id === activePageId)}" @click="changePageIfNeeded(page)"
        >
        <mdc-list-item class="pageItem">
          <i v-if="pageIndex === 0" slot="start-detail" class="material-icons">home</i>
          <i v-else slot="start-detail" class="material-icons">insert_drive_file</i>
          <span>{{page.name}}</span>
          <span v-show="(page.id === activePageId)" slot="secondary">{{page.path}}</span>

          <mdc-menu-anchor slot="end-detail" v-show="(page.id === activePageId)">
            <i class="material-icons" @click="showOptsMenu(page)">more_vert</i>

            <mdc-menu :ref="'menu-'+page.id" @select="(selected)=>onSelect(selected, pageIndex)">
              <mdc-menu-item>Rename page</mdc-menu-item>
              <mdc-menu-item>Duplicate page</mdc-menu-item>
              <mdc-menu-divider></mdc-menu-divider>
              <mdc-menu-item :disabled="(projectPages.length === 1)">Delete page</mdc-menu-item>
            </mdc-menu>
          </mdc-menu-anchor>
        </mdc-list-item>
      </div>
    </mdc-list>

    <mdc-fab icon="note_add" class="newPageBtn" @click="_togglePageDialog({isOpen: true, isNew: true})"></mdc-fab>
  </div>
</template>


<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
import { getPageById, getPageIndexById, deletePage, _changeActivePage, _togglePageDialog } from '@/store/types'

export default {
  name: 'pages-menu',
  computed: mapState({
    activePageId: state => state.app.selectedPage ? state.app.selectedPage.id : 'melonhead',
    projectPages: state => state ? state.project.pages : []
  }),
  methods: {
    changePageIfNeeded (page) {
      if (page.id !== this.activePageId) {
        this._changeActivePage(page)
      }
    },

    showOptsMenu (page) {
      this.changePageIfNeeded(page)
      this.$refs['menu-' + page.id][0].show()
    },

    onSelect (selected, pageIndex) {
      const EDIT = 0
      const DUPLICATE = 1
      const DELETE = 2

      switch (selected.index) {
        case EDIT:
          this._togglePageDialog({isOpen: true, isNew: false})
          break
        case DUPLICATE:
          break
        case DELETE:
          let fallbackPage = this.projectPages[(pageIndex > 0) ? 0 : 1] || null
          this.changePageIfNeeded(fallbackPage)
          this.deletePage(pageIndex)
          break
      }
    },

    ...mapGetters([getPageById, getPageIndexById]),
    ...mapMutations([_togglePageDialog, _changeActivePage, deletePage])
  }
}
</script>


<style scoped>
#pagesMenu {
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-flex-wrap: nowrap;
  -ms-flex-wrap: nowrap;
  flex-wrap: nowrap;
  height: 90%;
  width: 100%;
  position: absolute;
  overflow: visible;
  overflow-y: auto;
}

.newPageBtn {
  position: fixed;
  right: 92px;
  bottom: 32px;
}

.pageList {
  /*margin-bottom: auto;*/
  padding: 0;
}

.active {
  background-color: #fff;
}

.pageItem{
  padding: 4px 16px;
  overflow: inherit;
  cursor: pointer;
}

.mdc-menu-anchor {
  cursor: pointer;
}
</style>
