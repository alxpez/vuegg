<template>
    <nav class="mdl-navigation">
      <div class="mdl-tabs mdl-js-tabs">
        <div class="mdl-tabs__tab-bar">
          <a href="#elements" class="mdl-tabs__tab is-active">
            <i class="material-icons">select_all</i>
          </a>
          <a href="#settings" class="mdl-tabs__tab">
            <i class="material-icons">settings_applications</i>
          </a>
          <a href="#pages" class="mdl-tabs__tab">
            <i class="material-icons">insert_drive_file</i>
          </a>
        </div>

        <div class="mdl-tabs__panel is-active" id="elements">
          <EgglementsMenu></EgglementsMenu>
          <ComponeggsMenu></ComponeggsMenu>
        </div>
        <div class="mdl-tabs__panel" id="settings">
          <properties-menu></properties-menu>
        </div>
        <div class="mdl-tabs__panel" id="pages">

        </div>
      </div>
    </nav>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { toggleSidebar, toggleMiniSidebar } from '@/store/types'

import EgglementsMenu from './EgglementsMenu'
import ComponeggsMenu from './ComponeggsMenu'
import PropertiesMenu from './PropertiesMenu'

export default {
  name: 'side-bar',
  components: { EgglementsMenu, ComponeggsMenu, PropertiesMenu },
  computed: {
    drawerStatus: {
      get () {
        return this.app.sidebar.isOpen
      },
      set (status) {
        this.toggleSidebar(status)
      }
    },
    ...mapState(['app'])
  },
  methods: mapMutations([toggleMiniSidebar, toggleSidebar]),
  data: function () {
    return {
      propsMenu: false
    }
  }
}
</script>

<style scoped>
#sideBar {
  width: 200px;
  padding: 0px;
  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.2),
    0 1px 1px rgba(0, 0, 0, 0.14),
    0 2px 1px -1px rgba(0, 0, 0, 0.12);
}

.mini {
  width: 50px;
}
</style>
