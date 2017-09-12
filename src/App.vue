<template>
  <div id="app">

    <!-- TODO: Refactor toolbar and sidenav in components -->
    <md-toolbar>
      <md-button class="md-icon-button" @click="$refs.sidebar.toggle()">
        <md-icon>menu</md-icon>
      </md-button>

      <h2 class="md-title">vuexample</h2>
    </md-toolbar>

    <md-sidenav class="md-left" ref="sidebar">
      <md-toolbar>
        <md-button class="md-icon-button" @click="$refs.sidebar.toggle()">
          <md-icon>close</md-icon>
        </md-button>
        <h2 class="md-title">vuexample</h2>
      </md-toolbar>

      <components-menu></components-menu>
    </md-sidenav>

    <router-view></router-view>
  </div>
</template>

<script>
import ComponentsMenu from '@/components/ComponentsMenu'

export default {
  name: 'app',
  components: { ComponentsMenu }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
