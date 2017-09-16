<template>
  <div id="app">

    <!-- TODO: Future TopBar component -->
    <md-toolbar>
      <md-button class="md-icon-button" @click="$refs.sidebar.toggle()">
        <md-icon>menu</md-icon>
      </md-button>
      <h2 class="md-title">vuexample</h2>
      <router-link replace tag="md-button" to="/edit" class="md-accent">Go to edit</router-link>
    </md-toolbar>
    <!-- END TopBar -->

    <!-- TODO: Future SideBar component -->
    <md-sidenav class="md-left" ref="sidebar">
      <md-toolbar>
        <md-button class="md-icon-button" @click="$refs.sidebar.toggle()">
          <md-icon>close</md-icon>
        </md-button>
        <h2 class="md-title">vuexample</h2>
      </md-toolbar>
      <components-menu></components-menu>
    </md-sidenav>
    <!-- END SideBar -->

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
  background-color: #fafafa;
}
</style>
