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
  </v-navigation-drawer>
</template>

<script>
import { mapState } from 'vuex'
import ComponentsMenu from '@/components/ComponentsMenu'

export default {
  name: 'side-bar',
  components: { ComponentsMenu },
  computed: mapState(['app'])
}
</script>
