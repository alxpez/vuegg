<template>
  <v-navigation-drawer
    v-model="app.sidebar.isOpen"
    :mini-variant="app.sidebar.isMini"
    disable-route-watcher
    hide-overlay
    persistent
    clipped
  >
    <!-- Uncaught TypeError: _vm.toggleMiniSidebar is not a function -->
    <!-- <v-list>
      <v-list-tile>
        <v-list-tile-action>
          <v-btn icon @click.native.stop="toggleMiniSidebar">
            <v-icon v-if="app.sidebar.isMini">chevron_right</v-icon>
            <v-icon v-else>chevron_left</v-icon>
          </v-btn>
        </v-list-tile-action>
      </v-list-tile>
    </v-list> -->
    <v-expansion-panel>
      <v-expansion-panel-content>
        <div slot="header">
          <v-icon>dashboard</v-icon>Components
        </div>
        <components-menu></components-menu>
      </v-expansion-panel-content>
      <v-expansion-panel-content>
        <div slot="header">
          <v-icon>settings</v-icon>Properties
        </div>
        <components-menu></components-menu>
      </v-expansion-panel-content>
    </v-expansion-panel>
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
