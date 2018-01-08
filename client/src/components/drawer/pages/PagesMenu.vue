<template>
  <div id="pages-menu">
    <mdc-list class="page-list">
      <div v-for="(page, pageIndex) in projectPages" :key="page.id"
          :class="{active: (page.id === activePageId)}" @click="changePageIfNeeded(page)"
        >
        <mdc-list-item class="page-item">
          <svgicon v-if="pageIndex === 0" slot="start-detail" icon="system/home" width="24" height="24"
            :color="(page.id === activePageId)?'rgba(0,0,0,.87)':'rgba(0,0,0,.54)'"></svgicon>
          <svgicon v-else slot="start-detail"icon="system/page" width="24" height="24"
            :color="(page.id === activePageId)?'rgba(0,0,0,.87)':'rgba(0,0,0,.54)'"></svgicon>
          <div>
            <span class="item-title" :title="page.name">{{page.name}}</span>
            <span class="item-subtitle" v-show="(page.id === activePageId)" :title="page.path">{{page.path}}</span>
          </div>

          <mdc-menu-anchor slot="end-detail" v-show="(page.id === activePageId)">
            <svgicon icon="system/more_vert" width="24" height="24" @click.native="showOptsMenu(page)"></svgicon>

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

    <mdc-fab class="new-page-btn" @click="_togglePageDialog({isOpen: true, isNew: true})">
      <svgicon icon="system/add_page" width="24" height="24"></svgicon>
    </mdc-fab>
  </div>
</template>


<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
import { getPageById, getPageIndexById, deletePage, _changeActivePage, _togglePageDialog, _clearSelectedElements } from '@/store/types'

import '@/assets/icons/system/home'
import '@/assets/icons/system/page'
import '@/assets/icons/system/more_vert'
import '@/assets/icons/system/add_page'

export default {
  name: 'pages-menu',
  computed: mapState({
    activePageId: state => state.app.selectedPage ? state.app.selectedPage.id : 'melonhead',
    projectPages: state => state ? state.project.pages : []
  }),
  methods: {
    changePageIfNeeded (page) {
      if (page.id !== this.activePageId) {
        this._clearSelectedElements()
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
    ...mapMutations([_clearSelectedElements, _togglePageDialog, _changeActivePage, deletePage])
  }
}
</script>


<style scoped>
#pages-menu {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  height: calc(100% - 175px);
  width: 100%;
  position: absolute;
  overflow: visible;
  overflow-y: auto;
}

.new-page-btn {
  position: fixed;
  right: 92px;
  bottom: 32px;
}

.page-list {
  padding: 0;
}

.active {
  background-color: #fff;
}

.page-item {
  padding: 4px 16px;
  overflow: inherit;
  cursor: pointer;
}

.item-title,
.item-subtitle {
  width: 115px;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
}
.item-subtitle {
  font-size: 0.875rem;
  font-weight: 400;
  letter-spacing: 0.04em;
  line-height: 1.25rem;
}
.item-title {
  color: rgba(0,0,0,.38);
}
.page-item:hover .item-title,
.item-subtitle {
  color: rgba(0,0,0,.54);
}
.active .page-item .item-title,
.active .page-item:hover .item-title {
  color: rgba(0,0,0,.87);
}

.mdc-menu-anchor {
  cursor: pointer;
}
</style>
