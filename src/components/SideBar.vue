<template>
  <v-navigation-drawer
    v-model="app.sidebar.isOpen"
    :mini-variant="app.sidebar.mini"
    disable-route-watcher
    hide-overlay
    persistent
    clipped
  >
    <components-menu></components-menu>
    <!-- <v-btn icon small @click="toggleMiniSidebar">
      <v-icon>add</v-icon>
    </v-btn> -->
  </v-navigation-drawer>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { toggleMiniSidebar } from '@/store/types'
import ComponentsMenu from '@/components/ComponentsMenu'

export default {
  name: 'side-bar',
  components: { ComponentsMenu },
  computed: {
    ...mapState(['app']),
    ...mapMutations([toggleMiniSidebar])
  }
}
</script>
