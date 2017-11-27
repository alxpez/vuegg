<template>
  <div id="sideBar" class="col">
    <div>
      <EgglementsMenu></EgglementsMenu>
      <ComponeggsMenu></ComponeggsMenu>
      <properties-menu></properties-menu>
    </div>
    <div>
      <button class="col">E</button>
      <button class="col">C</button>
      <button class="col">P</button>
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
  width: 50px;
  padding: 0px;
}

.mini {
  width: 50px;
}
</style>
