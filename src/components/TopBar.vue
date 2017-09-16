<template>
  <v-toolbar>
    <v-toolbar-side-icon @click.stop="TOGGLE_SIDEBAR"></v-toolbar-side-icon>
    <v-toolbar-title>vuexample</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <routes-menu></routes-menu>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import { mapMutations } from 'vuex'
import types from '@/store/mutation-types'
import RoutesMenu from '@/components/RoutesMenu'

export default {
  name: 'top-bar',
  components: { RoutesMenu },
  methods: mapMutations([types.TOGGLE_SIDEBAR])
}
</script>
