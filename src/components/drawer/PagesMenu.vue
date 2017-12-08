<template>
  <div id="pagesMenu">
    <mdc-list class="pageList">
      <div v-for="(page, pageIndex) in projectPages" :key="page.id"
          :class="{active: (pageIndex === activePageIndex)}" @click="changeActivePage(page.id)"
        >
        <mdc-list-item class="pageItem">
          <i v-if="pageIndex === 0" slot="start-detail" class="material-icons">home</i>
          <i v-else slot="start-detail" class="material-icons">insert_drive_file</i>
          <span>{{page.name}}</span>
          <span v-show="(pageIndex === activePageIndex)" slot="secondary">{{page.path}}</span>
          <mdc-menu-anchor slot="end-detail" v-show="(pageIndex === activePageIndex)">
            <i class="material-icons" @click="showOptsMenu(page.id)">more_vert</i>
            <mdc-menu :ref="'menu-'+page.id" @select="(selected)=>onSelect(selected, pageIndex)" @cancel="onCancel">
              <mdc-menu-item>Rename page</mdc-menu-item>
              <mdc-menu-item>Duplicate page</mdc-menu-item>
              <mdc-menu-divider></mdc-menu-divider>
              <mdc-menu-item :disabled="(projectPages.length === 1)">Delete page</mdc-menu-item>
            </mdc-menu>
          </mdc-menu-anchor>
        </mdc-list-item>
      </div>
    </mdc-list>

    <mdc-fab icon="note_add" class="newPageBtn" @click="togglePageDialog({isOpen: true, isNew: true})"></mdc-fab>
  </div>
</template>


<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
import { getPageById, getPageIndexById, deletePage, togglePageDialog } from '@/store/types'

export default {
  name: 'pages-menu',
  computed: {
    activePageIndex () {
      // Getters return function when passing args -> getter()(arg)
      return this.getPageIndexById()(this.$route.query.page)
    },
    ...mapState({
      projectPages: state => state ? state.project.pages : []
    })
  },
  methods: {
    changeActivePage (value) {
      this.$router.replace({query: {page: value}})
    },
    showOptsMenu (pageId) {
      this.changeActivePage(pageId)
      this.$refs['menu-' + pageId][0].show()
    },
    onSelect (selected, pageIndex) {
      switch (selected.index) {
        // Edit page
        case 0:
          this.togglePageDialog({isOpen: true, isNew: false})
          break
        // Duplicate page
        case 1:
          break
        // Delete page
        case 2:
          let fallbackPage = this.projectPages[(pageIndex > 0) ? 0 : 1]
          this.changeActivePage(fallbackPage.id)
          this.deletePage(pageIndex)
          break
      }
    },
    onCancel () {
      console.log('menu cancelled')
    },
    ...mapGetters([getPageById, getPageIndexById]),
    ...mapMutations([togglePageDialog, deletePage])
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
