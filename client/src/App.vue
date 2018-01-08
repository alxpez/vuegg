<template>
  <div id="layout-container" class="mdc-theme--background">
    <div id="app">
      <headegg :scroll0="notScrolled"></headegg>

      <drawegg></drawegg>

      <main id="main" role="main" @scroll="scrollFunction">
        <router-view></router-view>
      </main>

      <page-dialog></page-dialog>
    </div>
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
#layout-container {
  position: absolute;
  width: 100%;
  height: 100%;
}

#app {
  font-family: 'Roboto', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
}

#main {
  -ms-flex: 0 1 auto;
  position: relative;
  display: inline-block;
  overflow-y: auto;
  overflow-x: auto;
  flex-grow: 1;
  z-index: auto;
  margin-right: 240px;
}

dialog {
  width: 320px;
  border: none;
  box-shadow:
    0 9px 46px 8px rgba(0,0,0,.14),
    0 11px 15px -7px rgba(0,0,0,.12),
    0 24px 38px 3px rgba(0,0,0,.2);
}

/* IN DEVICES SMALLER THAN 1024px -> NO DRAWER (so remove margins) - (TODO: show notice) */
@media screen and (max-width: 1024px) {
  #main {
    margin: 0px;
  }
}
</style>
