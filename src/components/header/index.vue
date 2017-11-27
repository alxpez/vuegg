<template>
  <div id="topBar" class="mb-2 row d-flex align-items-center bg-dark">
    <a id="menuButton" class="btn m-2 text-light" @click.stop="toggleSidebar(!app.sidebar.isOpen)">O</a>
    <h3 class="text-light">vuegg</h3>
    <input class="ml-auto mr-3" placeholder="Vuegg project"></input>
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
  height: 48px;
}

#menuButton {
  height: 40px;
  width: 40px;
  text-decoration: none;
  cursor:pointer;
}
</style>
