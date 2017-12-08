<template>
  <div id="app" class="mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header">
    <header class="mdl-layout__header">
      <headegg></headegg>
    </header>

    <div class="mdl-layout__drawer">
      <drawegg></drawegg>
    </div>

    <main class="mdl-layout__content">
      <div class="page-content">
        <router-view></router-view>
      </div>
    </main>

    <page-dialog></page-dialog>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

import Headegg from '@/components/header'
import Drawegg from '@/components/drawer'
import PageDialog from '@/components/drawer/PageDialog'

export default {
  name: 'app',
  components: { Headegg, Drawegg, PageDialog },
  methods: mapMutations(['initializeState']),
  mounted: function () {
    this.initializeState()
  }
}
</script>

<style>
#app {
  font-family: 'Roboto', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #eeeeee;
}

.mdl-layout__header>.mdl-layout__drawer-button {
  display: none;
}
</style>

<style scoped>
.mdl-layout__header{
  background-color: inherit;
  box-shadow: 0 0 0;
  margin-left: 0;
}

.mdl-layout--fixed-drawer.is-upgraded:not(.is-small-screen)>.mdl-layout__header {
  margin-left: 0;
  margin-right: 240px;
}

.mdl-layout__drawer {
  right: 0;
  left: auto;
  -webkit-transform: translateX(0);
  transform: translateX(0);
}

.mdl-layout--fixed-drawer>.mdl-layout__content {
  margin-right: 240px;
  margin-left: 0;
}
</style>
