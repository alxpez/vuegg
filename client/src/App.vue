<template>
  <div id="app" class="mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header">
    <header class="mdl-layout__header" :class="{'not-scrolled': notScrolled}">
      <headegg></headegg>
    </header>

    <div class="mdl-layout__drawer">
      <drawegg></drawegg>
    </div>

    <main id="main" role="main" class="main" @scroll="scrollFunction">
      <router-view></router-view>
    </main>

    <page-dialog></page-dialog>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

import Headegg from '@/components/header'
import Drawegg from '@/components/drawer'
import PageDialog from '@/components/drawer/pages/PageDialog'

export default {
  name: 'app',
  components: { Headegg, Drawegg, PageDialog },
  data: function () {
    return {
      notScrolled: true
    }
  },
  methods: {
    scrollFunction (e) {
      this.notScrolled = (e.target.scrollTop === 0)
    },
    ...mapMutations(['initializeState'])
  },
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
}

.mdl-layout__header>.mdl-layout__drawer-button {
  display: none;
}
</style>

<style scoped>
.main {
  -ms-flex: 0 1 auto;
  /*position: relative;*/
  display: inline-block;
  overflow-y: auto;
  overflow-x: auto;
  -webkit-flex-grow: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
  z-index: 1;
  -webkit-overflow-scrolling: touch;
  margin-right: 240px;
  background-color: #eee;
}

.not-scrolled {
  box-shadow: 0 0 0;
}

.mdl-layout__header{
  background-color: inherit;
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
  overflow: hidden;
}

</style>
