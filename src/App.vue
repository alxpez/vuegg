<template>
  <v-app id="app" dark>
    <top-bar></top-bar>
    <side-bar></side-bar>
    <main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </main>
  </v-app>
</template>

<script>
import TopBar from '@/components/header'
import SideBar from '@/components/side'

export default {
  name: 'app',
  components: { TopBar, SideBar }
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
