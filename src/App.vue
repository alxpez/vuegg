<template>
  <div id="app">
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
      <md-list>
        <md-list-item>
          <md-icon>settings</md-icon> <span>Settings</span>
        </md-list-item>
      </md-list>
    </md-sidenav>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
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
