<template>
  <div id="sideBar" class="bg-secondary pt-2">
    <div>
      <a :class="{'d-none': !propsMenu}" class="text-light" @click="propsMenu=false">
        <i class="material-icons">select_all</i>
      </a>
      <a :class="{'d-none': propsMenu}" class="text-light" @click="propsMenu=true">
        <i class="material-icons">settings_applications</i>
      </a>
    </div>
    <div>
      <div :class="{'d-none': propsMenu}">
        <EgglementsMenu></EgglementsMenu>
        <ComponeggsMenu></ComponeggsMenu>
      </div>
      <properties-menu :class="{'d-none': !propsMenu}"></properties-menu>
    </div>
  </div>
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
