<template>
  <div id="topBar" class="row">
    <button class="ml-3" @click.stop="toggleSidebar(!app.sidebar.isOpen)"></button>
    <label>vuegg</label>
    <input placeholder="Vuegg project"></input>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { toggleSidebar } from '@/store/types'

export default {
  name: 'top-bar',
  computed: mapState(['app']),
  methods: mapMutations([toggleSidebar])
}
</script>

<style scoped>
#topBar {
  width: 100%;
}
</style>
