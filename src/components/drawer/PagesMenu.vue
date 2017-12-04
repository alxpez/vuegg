<template>
  <div id="pagesMenu">
    <ul class="mdl-list">
      <li v-for="page in project.pages" class="mdl-list__item">
        <span class="mdl-list__item-primary-content">
          <i class="material-icons mdl-list__item-icon">insert_drive_file</i>
          {{page.name}}
        </span>

        <span class="mdl-list__item-secondary-action">
          <button id="pageOpts" class="mdl-button mdl-js-button mdl-button--icon">
            <i class="material-icons">more_vert</i>
          </button>
          <ul class="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect" for="pageOpts">
            <li class="mdl-menu__item" @click.native.stop="togglePageDialog({isOpen: true, isNew: false})">Rename page</li>
            <li class="mdl-menu__item">Duplicate page</li>
            <li class="mdl-menu__item" @click.native.stop="deletePage(pageIndex)">Delete page</li>
          </ul>
        </span>
      </li>
    </ul>
    <button class="mdl-button mdl-js-button mdl-button--fab" @click.native.stop="togglePageDialog({isOpen: true, isNew: true})">
      <i class="material-icons">add</i>
    </button>
  </div>
</template>


<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
import { getPageById, getPageIndexById, deletePage, togglePageDialog } from '@/store/types'

export default {
  name: 'pages-menu',
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
  max-height: 90%;
  position: absolute;
  overflow: visible;
  overflow-y: auto;
}

.mdl-list {
  margin: 0;
  padding: 0 0 0 8px;
}

.mdl-list__item .mdl-list__item-primary-content {
  cursor: pointer;
}

.mdl-list__item .mdl-list__item-primary-content .mdl-list__item-icon {
    margin-right: 16px;
}

#pageOptMenu {
  right: 30px;
}

.mdl-button--fab {
  margin: auto auto 5px;
}
</style>
