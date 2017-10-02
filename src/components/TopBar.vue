<template>
  <v-toolbar fixed>
    <v-toolbar-side-icon class="ml-3" @click.stop="toggleSidebar(!app.sidebar.isOpen)"></v-toolbar-side-icon>
    <v-toolbar-title>vuexample</v-toolbar-title>
    <routes-menu></routes-menu>
  </v-toolbar>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { toggleSidebar } from '@/store/types'
import RoutesMenu from '@/components/RoutesMenu'

export default {
  name: 'top-bar',
  components: { RoutesMenu },
  computed: mapState(['app']),
  methods: mapMutations([toggleSidebar])
}
</script>
