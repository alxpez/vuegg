<template>
  <div id="sideBar" class="container">
    <div class="row">
      <EgglementsMenu></EgglementsMenu>
      <ComponeggsMenu></ComponeggsMenu>
      <properties-menu></properties-menu>
    </div>
    <div class="row">
      <button>E</button>
      <button>C</button>
      <button>P</button>
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
  methods: mapMutations([toggleMiniSidebar, toggleSidebar])
}
</script>

<style scoped>
#sideBar {
  width: 150px;
}

.mini {
  width: 50px;
}
</style>
